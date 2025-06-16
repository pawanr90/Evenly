from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

# Expense schemas
class ExpenseBase(BaseModel):
    description: str
    amount: float

class ExpenseCreate(ExpenseBase):
    participant_ids: List[str]
    amounts_paid: List[float]
    amounts_owed: List[float]

class Expense(ExpenseBase):
    id: int
    date: datetime
    created_by_id: str
    participants: List[User]

    class Config:
        from_attributes = True

# Settlement schemas
class SettlementBase(BaseModel):
    amount: float
    payer_id: int
    payee_id: int

class SettlementCreate(SettlementBase):
    pass

class Settlement(SettlementBase):
    id: int
    date: datetime
    is_settled: bool
    payer: User
    payee: User

    class Config:
        from_attributes = True

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None 