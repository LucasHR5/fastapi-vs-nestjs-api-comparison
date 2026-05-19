from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.user_model import User
from app.core.security import (
    verify_password,
    create_access_token,    
)

def login(
        db: Session,
        email: str,
        password: str
):
    user = db.query(User).filter(
        User.email == email
    ).first()
    if not user:
        raise HTTPException(
            status_code=400,
            detail="Invalid email or password"
        )
    password_valid = verify_password(
        password,
        user.password
    )

    if not password_valid:
        raise HTTPException(
            status_code=400,
            detail="Invalid email or password"
        )
    
    token = create_access_token(
        data={
            "sub": user.email,
            "email": user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }