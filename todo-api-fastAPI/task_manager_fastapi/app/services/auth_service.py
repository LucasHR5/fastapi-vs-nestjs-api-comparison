from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.user_model import User
from app.core.security import (
    verify_password,
    create_access_token,    
)

def login(db, email, password):
    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        return None

    if not verify_password(
        password,
        user.password
    ):
        return None

    access_token = create_access_token(
        data={
            "sub": str(user.id)
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }