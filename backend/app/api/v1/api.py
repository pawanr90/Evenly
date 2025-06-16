from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, expenses, settlements

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(expenses.router, prefix="/expenses", tags=["expenses"])
api_router.include_router(settlements.router, prefix="/settlements", tags=["settlements"]) 