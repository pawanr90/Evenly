from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base
from app.models.user import User

# Association table for expense participants
expense_participants = Table(
    'expense_participants',
    Base.metadata,
    Column('expense_id', Integer, ForeignKey('expenses.id')),
    Column('user_id', String, ForeignKey('users.id')),
    Column('amount_owed', Float, nullable=False),
    Column('amount_paid', Float, nullable=False)
)

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    amount = Column(Float, nullable=False)
    date = Column(DateTime(timezone=True), server_default=func.now())
    created_by_id = Column(String, ForeignKey("users.id"))
    
    # Relationships
    created_by = relationship("User", back_populates="expenses_created")
    participants = relationship("User", secondary=expense_participants, back_populates="expenses_participated")

class Settlement(Base):
    __tablename__ = "settlements"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    date = Column(DateTime(timezone=True), server_default=func.now())
    is_settled = Column(Boolean, default=False)
    payer_id = Column(String, ForeignKey("users.id"))
    payee_id = Column(String, ForeignKey("users.id"))
    
    # Relationships
    payer = relationship("User", foreign_keys=[payer_id], back_populates="settlements_paid")
    payee = relationship("User", foreign_keys=[payee_id], back_populates="settlements_received") 