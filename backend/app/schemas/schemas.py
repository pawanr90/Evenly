from pydantic import BaseModel, EmailStr
from typing import List
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str

class User(UserBase):
    id: str
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
    created_by: User
    participants: List[User]

    class Config:
        from_attributes = True

# Settlement schemas
class SettlementBase(BaseModel):
    amount: float
    payer_id: str
    payee_id: str

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
