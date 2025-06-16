from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas import schemas
from app.models.models import Settlement
from app.models.user import User
from app.core.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.Settlement)
def create_settlement(
    *,
    db: Session = Depends(get_db),
    settlement_in: schemas.SettlementCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    if settlement_in.payer_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="You can only create settlements where you are the payer",
        )
    
    payee = db.query(User).filter(User.id == settlement_in.payee_id).first()
    if not payee:
        raise HTTPException(
            status_code=404,
            detail="Payee not found",
        )
    
    settlement = Settlement(
        amount=settlement_in.amount,
        payer_id=settlement_in.payer_id,
        payee_id=settlement_in.payee_id,
    )
    db.add(settlement)
    db.commit()
    db.refresh(settlement)
    return settlement

@router.get("/", response_model=List[schemas.Settlement])
def read_settlements(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
) -> Any:
    settlements = (
        db.query(Settlement)
        .filter(
            (Settlement.payer_id == current_user.id) |
            (Settlement.payee_id == current_user.id)
        )
        .offset(skip)
        .limit(limit)
        .all()
    )
    return settlements

@router.put("/{settlement_id}/settle", response_model=schemas.Settlement)
def mark_settlement_as_paid(
    *,
    db: Session = Depends(get_db),
    settlement_id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    settlement = db.query(Settlement).filter(Settlement.id == settlement_id).first()
    if not settlement:
        raise HTTPException(
            status_code=404,
            detail="Settlement not found",
        )
    
    if settlement.payee_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Only the payee can mark a settlement as paid",
        )
    
    settlement.is_settled = True
    db.commit()
    db.refresh(settlement)
    return settlement 