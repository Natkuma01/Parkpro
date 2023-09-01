from pydantic import BaseModel
from datetime import datetime


class TripNoteIn(BaseModel):
    content: str
    username: str
    parkCode: str
    created: datetime
    updated: datetime


class TripNoteOut(BaseModel):
    id: str | None
    content: str | None
    username: str | None
    parkCode: str | None
    created: datetime | None
    updated: datetime | None


class TripNotesOut(BaseModel):
    trip_notes: list[TripNoteOut]
