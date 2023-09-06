import os
from typing import Tuple, Union
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from pydantic import BaseModel
from queries.accounts import AccountQueries
from models.accounts import AccountOut, AccountOutWithPassword


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountQueries,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
<<<<<<< HEAD
        return accounts.get_account(username)
=======
        return accounts.get_account(email)
>>>>>>> comment

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        return account.username, AccountOut(**account.dict())


<<<<<<< HEAD
authenticator = MyAuthenticator(os.environ.get("SIGNING_KEY"))
=======
authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
>>>>>>> comment
