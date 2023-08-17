from pydantic import BaseModel


class Error(BaseModel):
    message: str


class Message(BaseModel):
    message: str
