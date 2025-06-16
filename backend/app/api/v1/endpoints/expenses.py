from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas import schemas
from app.models.models import Expense, expense_participants
from app.models.user import User
from app.core.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.Expense)
def create_expense(
    *,
    db: Session = Depends(get_db),
    expense_in: schemas.ExpenseCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    if len(expense_in.participant_ids) != len(expense_in.amounts_paid) or len(expense_in.participant_ids) != len(expense_in.amounts_owed):
        raise HTTPException(
            status_code=400,
            detail="Number of participants must match amounts paid and owed",
        )
    
    expense = Expense(
        description=expense_in.description,
        amount=expense_in.amount,
        created_by_id=current_user.id,
    )
    db.add(expense)
    db.commit()
    db.refresh(expense)
    
    # Add participants and their amounts
    for i, participant_id in enumerate(expense_in.participant_ids):
        participant = db.query(User).filter(User.id == participant_id).first()
        if not participant:
            raise HTTPException(
                status_code=404,
                detail=f"User with id {participant_id} not found",
            )
        expense.participants.append(participant)
        db.execute(
            expense_participants.insert().values(
                expense_id=expense.id,
                user_id=participant_id,
                amount_paid=expense_in.amounts_paid[i],
                amount_owed=expense_in.amounts_owed[i]
            )
        )
    
    db.commit()
    db.refresh(expense)
    return expense

@router.get("/", response_model=List[schemas.Expense])
def read_expenses(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
) -> Any:
    expenses = (
        db.query(Expense)
        .filter(
            (Expense.created_by_id == current_user.id) |
            (Expense.participants.any(id=current_user.id))
        )
        .offset(skip)
        .limit(limit)
        .all()
    )
    return expenses

@router.get("/{expense_id}", response_model=schemas.Expense)
def read_expense(
    *,
    db: Session = Depends(get_db),
    expense_id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(
            status_code=404,
            detail="Expense not found",
        )
    if expense.created_by_id != current_user.id and current_user not in expense.participants:
        raise HTTPException(
            status_code=403,
            detail="Not enough permissions",
        )
    return expense 