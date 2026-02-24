from xmlrpc.client import boolean

from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean
from .database import Base

class Object(Base):
    __tablename__ = "objects"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)

class Exercise(Base):
    __tablename__ = "exercises"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(Text)
    category = Column(String)
    office = Column(Boolean, default=True)
    duration = Column(Integer)
    video_url = Column(String, nullable=True)

class ObjectExercise(Base):
    __tablename__ = "object_exercise"
    object_id = Column(Integer, ForeignKey("objects.id"), primary_key=True)
    exercise_id = Column(Integer, ForeignKey("exercises.id"), primary_key=True)
