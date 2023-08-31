from models.accounts import AccountOutWithPassword, AccountIn
from bson.objectid import ObjectId
from db import client, dbname
from pprint import pprint

class AccountQueries():
    def get_account(self, username: str) -> AccountOutWithPassword:
        db = client[dbname]
        result = db.accounts.find_one({"username": username})
        if result:
            result["id"] = str(result["_id"])
            result["hashed_password"] = result["password"]
            del result["password"]
            return AccountOutWithPassword(
                **result
                )


    def create_new_account(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        info_dict = info.dict()
        info_dict['password'] = hashed_password
        info_dict['visited'] = []
        info_dict['bucket_list'] = []
        info_dict['avatar'] = {
            "color": None,
            "image": None,
        }
        db = client[dbname]
        result = db.accounts.insert_one(info_dict)
        if result.inserted_id:
            result = self.get_account(info_dict["username"])
            result = result.dict()
            return AccountOutWithPassword(
                **result
                )


    def update_account(self, account, account_data, id):
        db = client[dbname]
        new_account = account.dict()
        user = db.accounts.find_one({"_id": ObjectId(id)})
        if user["username"] == account_data["username"]:
            result = db.accounts.update_one(
                {"_id": ObjectId(id)},
                {"$set": {**new_account}},
            )
            if result:
                result = db.accounts.find_one(ObjectId(id))
                result["id"] = str(result["_id"])
                return result
        else:
            return {'message': 'You can only change your account information'}


    def delete_account(self, account_data, id):
        db = client[dbname]
        user = db.accounts.find_one({"_id": ObjectId(id)})
        if user["username"] == account_data["email"]:
            result = db.accounts.delete_one({"_id": ObjectId(id)})
            if result:
                return  {'object_deleted': True}
        else:
            return {'message': 'You can only delete your own account'}

    def get_user(self, account_data):
        pprint("Hello")
        pprint(account_data)
