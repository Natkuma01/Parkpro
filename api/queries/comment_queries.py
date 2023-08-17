from db import client, dbname
from bson.objectid import ObjectId
from pprint import pprint


class CommentQueries:
    def get_all_comments(self):
        db = client[dbname]
        result = list(db.Comments.find())
        for value in result:
            value["id"] = str(value["_id"])
        return result

    def get_comment(self, id):
        db = client[dbname]
        result = db.Comments.find_one({"_id": id})
        if result:
            result["id"] = result["_id"]
            return result

    def create_comment(self, comment):
        db = client[dbname]
        result = db.Comments.insert_one(comment.dict())
        if result.inserted_id:
            result = self.get_comment(result.inserted_id)
            result["id"] = str(result["id"])
            return result

    def update_comment(self, id, comment, account_data):
        new_comment = comment.dict()
        print("comment2")
        old_comment = self.get_comment(ObjectId(id))
        pprint(old_comment)
        print("account_data")
        pprint(account_data)
        if old_comment['username'] == account_data['email']:
            db = client[dbname]
            result = db.Comments.update_one(
                {"_id": ObjectId(id)},
                {"$set": {**new_comment}},
                )
            if result:
                result = self.get_comment(ObjectId(id))
                result["id"] = str(result["_id"])
                return result
        else:
            return {"message": "User not the original author of the comment"}

    def delete_comment(self, id):
        db = client[dbname]
        result = db.Comments.delete_one(
            {"_id": ObjectId(id)},
        )
        if result:
            return {"Comment deleted": True}
