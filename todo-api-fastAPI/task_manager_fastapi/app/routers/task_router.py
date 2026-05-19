from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.task_schema import TaskCreate, TaskResponse
from app.services import task_service
from app.dependencies.auth_dependency import get_current_user
from app.models.user_model import User

router = APIRouter(prefix="/tasks", tags=["Tasks"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    return task_service.create_task(db, task)

@router.get("/", response_model=list[TaskResponse])
def list_tasks(
    db:Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
    ):
    return task_service.get_tasks(db)

@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = task_service.get_task_by_id(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return task

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task_data: TaskCreate, db: Session = Depends(get_db)):
    task = task_service.update_task(db, task_id, task_data)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = task_service.delete_task(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return {"detail": "Task deleted successfully"}