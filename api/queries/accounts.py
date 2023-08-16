from models.accounts import AccountOutWithPassword, AccountIn
from db import client, dbname


class AccountQueries():
    def get_account(self, email: str) -> AccountOutWithPassword:
        db = client[dbname]
        result = db.accounts.find_one({"email": email})
        if result:
            result["id"] = result["_id"]
            return AccountOutWithPassword(
                first_name=result['first_name'],
                last_name=result['last_name'],
                username=result['username'],
                email=result['email'],
                id=str(result['id']),
                hashed_password=result["password"]
                )

    def create_new_account(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        info_dict = info.dict()
        info_dict['password'] = hashed_password
        db = client[dbname]
        result = db.accounts.insert_one(info_dict)
        if result.inserted_id:
            result = self.get_account(info.email)
            result = result.dict()
            return AccountOutWithPassword(
                first_name=result['first_name'],
                last_name=result['last_name'],
                username=result['username'],
                email=result['email'],
                id=str(result['id']),
                hashed_password=result['hashed_password']
                )
