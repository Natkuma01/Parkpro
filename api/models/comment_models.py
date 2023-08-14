from pydantic import BaseModel
from datetime import datetime


class CommentIn(BaseModel):
    title: str
    content: str
    posted: datetime
    parkCode: str
    comments: list[str]
    user_id: str


class CommentOut(BaseModel):
    id: str
    title: str
    content: str
    posted: datetime
    parkCode: str
    comments: list[str]
    user_id: str


class CommentsOut(BaseModel):
    comments: list[CommentOut]
