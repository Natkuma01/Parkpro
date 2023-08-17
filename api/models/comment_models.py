from pydantic import BaseModel
from datetime import datetime


class CommentIn(BaseModel):
    title: str
    content: str
    posted: datetime
    parkCode: str
    username: str
    comments: list[dict] | None = None


class CommentOut(BaseModel):
    id: str
    title: str
    content: str
    posted: datetime
    parkCode: str
    username: str
    comments: list[dict] | None = None


class CommentsOut(BaseModel):
    comments: list[CommentOut]
