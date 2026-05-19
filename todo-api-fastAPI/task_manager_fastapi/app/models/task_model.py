from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.sql import func
from app.database import Base
from app.models.enums import StatusEnum, PriorityEnum

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)

    status = Column(Enum(StatusEnum), default=StatusEnum.PENDING)
    priority = Column(Enum(PriorityEnum), default=PriorityEnum.MEDIUM)

    due_date = Column(DateTime, nullable=True)
    category = Column(String, nullable=True)
    labels = Column(String, nullable=True)

    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())