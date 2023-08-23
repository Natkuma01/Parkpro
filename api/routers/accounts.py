from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from typing import Union
from pydantic import BaseModel
from queries.accounts import AccountQueries as q
from models.shared import Deleted, Error
from models.accounts import (
    AccountIn,
    AccountOut,
    DuplicateAccountError,
    AccountForm,
    AccountToken,
    HttpError,
)

from queries.accounts import AccountQueries, AccountIn


router = APIRouter()


@router.get("/api/protected", response_model=bool)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):

    hashed_password = authenticator.hash_password(plain_password=info.password)

    try:
        account = accounts.create_new_account(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )

    form = AccountForm(
        username=info.email,
        password=info.password,
        )

    token = await authenticator.login(response, request, form, accounts)

    return AccountToken(account=account, **token.dict())

@router.put("/accounts/{id}", response_model=Union[AccountOut, Error])
def update_account(
    id: str,
    account: AccountIn,
    account_data : dict = Depends(authenticator.get_current_account_data),
    queries: q = Depends(),
):
    return queries.update_account(account, account_data, id)


@router.delete("/accounts/{id}", response_model=Union[Deleted, Error])
def delete_account(
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: q = Depends(),
    id=str,
):

    return queries.delete_account(account_data, id)
