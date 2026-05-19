from pydantic import BaseModel
from datetime import datetime
from app.models.enums import StatusEnum, PriorityEnum

class TaskCreate(BaseModel):
    title: str 
    description: str |None = None
    status: StatusEnum = StatusEnum.PENDING
    priority: PriorityEnum = PriorityEnum.MEDIUM

    due_date: datetime | None = None
    category: str | None = None
    labels: str | None = None

    owner_id: int

class TaskResponse(TaskCreate):
    id: int
    
    class Config:
        from_attributes = True