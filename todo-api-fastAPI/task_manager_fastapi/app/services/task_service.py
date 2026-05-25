from sqlalchemy.orm import Session
from app.models.task_model import Task

def create_task(
    db: Session,
    task_data,
    owner_id
):
    task = Task(
        **task_data.dict(),
        owner_id=owner_id
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task
def get_tasks(db:Session):
    return db.query(Task).all()

def get_task_by_id(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()

def update_task(db: Session, task_id: int, task_data):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        return None
    
    for key, value in task_data.dict(exclude_unset=True).items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        return None
    
    db.delete(task)
    db.commit()
    return task