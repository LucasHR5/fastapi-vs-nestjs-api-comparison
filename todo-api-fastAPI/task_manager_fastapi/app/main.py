from fastapi import FastAPI
from app.database import engine, Base
from app.routers import user_router, task_router, auth_router


app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "API is running on localhost:8000 and you can acess the documentation at localhost:8000/docs"}

app.include_router(user_router.router)
app.include_router(task_router.router)
app.include_router(auth_router.router)

