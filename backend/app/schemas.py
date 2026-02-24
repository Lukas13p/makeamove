from pydantic import BaseModel
from typing import List
from typing import Optional

class ExerciseOut(BaseModel):
    id: int
    name: str
    description: str
    category: str
    duration: int
    office: bool
    video_url: Optional[str] = None

    class Config:
        orm_mode = True

class ExerciseDetail(ExerciseOut):
    description: str

# bisher nicht gebraucht
class AnalyzeResponse(BaseModel):
    objects: List[str]

class FilterRequest(BaseModel):
    objects: List[str]
    env: str          # "office" | "homeoffice"
    duration: int    # Minuten
