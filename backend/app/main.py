from fastapi import FastAPI, UploadFile, Depends
from sqlalchemy.orm import Session
import shutil

from .database import Base, engine, SessionLocal
from .yolo import analyze_image
from .crud import get_exercises_for_objects, get_exercise
from .models import Exercise, ObjectExercise, Object
from .schemas import ExerciseOut, ExerciseDetail

from .schemas import FilterRequest

Base.metadata.create_all(bind=engine)
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- Image analysis endpoint ---
@app.post("/analyze")
async def analyze(file: UploadFile, db: Session = Depends(get_db)):
    path = f"media/uploads/{file.filename}"
    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    objects = analyze_image(path)
    # Exercises hier noch nicht nötig
    return {"objects": objects}


# --- Exercise detail endpoint ---
@app.get("/exercise/{id}", response_model=ExerciseDetail)
def exercise(id: int, db: Session = Depends(get_db)):
    return get_exercise(db, id)


# --- Filtered exercises endpoint ---
from random import shuffle

@app.post("/filtered_exercises", response_model=list[ExerciseOut])
def filtered_exercises(
    req: FilterRequest,
    db: Session = Depends(get_db)
):
    objects = req.objects
    env = req.env
    duration = req.duration

    # --- 1. Übungen aus gewählten Objekten ---
    query = (
        db.query(Exercise)
        .join(ObjectExercise)
        .join(Object)
        .filter(Object.name.in_(objects))
    )

    if env == "office":
        query = query.filter(Exercise.office.is_(True))
    else:
        query = query.filter(Exercise.office.is_(False))

    exercises = query.all()
    shuffle(exercises)

    selected = []
    total_time = 0

    for ex in exercises:
        if total_time + ex.duration <= duration:
            selected.append(ex)
            total_time += ex.duration

    # --- 2. Falls Workout zu kurz: mit "none" auffüllen ---
    if total_time < duration:
        none_query = (
            db.query(Exercise)
            .join(ObjectExercise)
            .join(Object)
            .filter(Object.name == "none")
        )

        if env == "office":
            none_query = none_query.filter(Exercise.office.is_(True))
        else:
            none_query = none_query.filter(Exercise.office.is_(False))

        none_exercises = none_query.all()
        shuffle(none_exercises)

        for ex in none_exercises:
            if total_time + ex.duration <= duration:
                selected.append(ex)
                total_time += ex.duration

            if total_time >= duration:
                break

    return selected