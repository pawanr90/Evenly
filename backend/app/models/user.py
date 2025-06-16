from sqlalchemy import Boolean, Column, String, DateTime, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    expenses_created = relationship("Expense", back_populates="created_by")
    expenses_participated = relationship("Expense", secondary="expense_participants", back_populates="participants")
    settlements_paid = relationship("Settlement", foreign_keys="Settlement.payer_id", back_populates="payer")
    settlements_received = relationship("Settlement", foreign_keys="Settlement.payee_id", back_populates="payee") 