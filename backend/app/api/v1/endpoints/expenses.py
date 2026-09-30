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
    participant_ids = expense_in.participant_ids
    if len(participant_ids) != len(expense_in.amounts_paid) or len(participant_ids) != len(expense_in.amounts_owed):
        raise HTTPException(
            status_code=400,
            detail="Number of participants must match amounts paid and owed",
        )
    if expense_in.amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be greater than zero")
    if len(set(participant_ids)) != len(participant_ids):
        raise HTTPException(status_code=400, detail="Participants must be unique")
    if current_user.id not in participant_ids:
        raise HTTPException(status_code=400, detail="You must be a participant in the expense")
    if any(a < 0 for a in expense_in.amounts_paid + expense_in.amounts_owed):
        raise HTTPException(status_code=400, detail="Amounts cannot be negative")
    if abs(sum(expense_in.amounts_paid) - expense_in.amount) > 0.01:
        raise HTTPException(status_code=400, detail="Amounts paid must add up to the expense amount")
    if abs(sum(expense_in.amounts_owed) - expense_in.amount) > 0.01:
        raise HTTPException(status_code=400, detail="Amounts owed must add up to the expense amount")

    found_ids = {u.id for u in db.query(User.id).filter(User.id.in_(participant_ids)).all()}
    missing = [pid for pid in participant_ids if pid not in found_ids]
    if missing:
        raise HTTPException(
            status_code=404,
            detail=f"User with id {missing[0]} not found",
        )

    expense = Expense(
        description=expense_in.description,
        amount=expense_in.amount,
        created_by_id=current_user.id,
    )
    db.add(expense)
    db.flush()

    # Add participants and their amounts
    db.execute(
        expense_participants.insert(),
        [
            {
                "expense_id": expense.id,
                "user_id": participant_id,
                "amount_paid": expense_in.amounts_paid[i],
                "amount_owed": expense_in.amounts_owed[i],
            }
            for i, participant_id in enumerate(participant_ids)
        ],
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
        .order_by(Expense.date.desc())
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