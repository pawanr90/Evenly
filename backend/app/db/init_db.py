from sqlalchemy.orm import Session
from app.db.base_class import Base
from app.db.session import engine

def init_db() -> None:
    # Create tables
    Base.metadata.create_all(bind=engine) 