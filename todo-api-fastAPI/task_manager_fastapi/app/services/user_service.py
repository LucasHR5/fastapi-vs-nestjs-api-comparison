from sqlalchemy.orm import Session
from app.models.user_model import User
from app.core.security import hash_password

def create_user(db: Session, user_data):
    hashed_password = hash_password(user_data.password)
    
    user = User(
        email = user_data.email,
        password = hashed_password,
        name = user_data.name
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_users(db:Session):
    return db.query(User).all()