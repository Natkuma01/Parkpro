from pydantic import BaseModel
from datetime import datetime


class TripNoteIn(BaseModel):
    title: str
    content: str
    username: str
    parkCode: str
    created: datetime



class TripNoteOut(BaseModel):
    id: str
    title: str
    content: str
    username: str
    parkCode: str
    created: datetime


class TripNotesOut(BaseModel):
    trip_notes: list[TripNoteOut]