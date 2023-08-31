from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: str
    password: str


class AccountOut(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: str
    id: str
    visited: list[str]
    bucket_list: list[str]
    avatar: dict


class AccountUpdate(BaseModel):
    id: str
    first_name: str
    last_name: str
    username: str
    email: str
    avatar: dict




class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountForm(BaseModel):
    password: str
    username: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str
