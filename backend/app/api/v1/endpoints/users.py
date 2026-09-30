from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.core.auth import get_current_user
from app.db.session import get_db
from app.schemas import schemas
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[schemas.User])
def read_users(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
) -> Any:
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@router.get("/lookup", response_model=schemas.User)
def lookup_user_by_email(
    *,
    db: Session = Depends(get_db),
    email: str,
    current_user: User = Depends(get_current_user),
) -> Any:
    user = db.query(User).filter(func.lower(User.email) == email.strip().lower()).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail=f"No user with email {email}",
        )
    return user

@router.get("/{user_id}", response_model=schemas.User)
def read_user(
    *,
    db: Session = Depends(get_db),
    user_id: str,
    current_user: User = Depends(get_current_user),
) -> Any:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )
    return user
