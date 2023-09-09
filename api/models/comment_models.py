from pydantic import BaseModel
from datetime import datetime


class CommentIn(BaseModel):
    title: str | None
    content: str
    posted: datetime
    parkCode: str | None
    username: str | None
    parent_id: str | None


class CommentOut(BaseModel):
    id: str
    title: str | None
    content: str
    posted: datetime
    parkCode: str | None
    username: str | None
    parent_id: str | None


class CommentsOut(BaseModel):
    comments: list[CommentOut]
