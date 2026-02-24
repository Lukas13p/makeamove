from sqlalchemy.orm import Session
from .models import Object, Exercise, ObjectExercise

def get_exercises_for_objects(db: Session, names: list[str]):
    return (
        db.query(Exercise)
        .join(ObjectExercise)
        .join(Object)
        .filter(Object.name.in_(names))
        .all()
    )

def get_exercise(db: Session, exercise_id: int):
    return db.query(Exercise).filter(Exercise.id == exercise_id).first()