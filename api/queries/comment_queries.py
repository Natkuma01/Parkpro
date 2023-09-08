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
        result = db.Comments.find_one({"_id": ObjectId(id)})
        if result:
            result["id"] = str(result["_id"])
            del result["_id"]
            return result

    def create_comment(self, comment, account_data):
        db = client[dbname]
        comment = comment.dict()
        comment["username"] = account_data["username"]
        result = db.Comments.insert_one(comment)
        if result.inserted_id:
            result = self.get_comment(result.inserted_id)
            pprint(result)
            return result

    def update_comment(self, id, comment, account_data):
        new_comment = comment.dict()
        old_comment = self.get_comment(ObjectId(id))
        if old_comment['username'] == account_data['username']:
            db = client[dbname]
            result = db.Comments.update_one(
                {"_id": ObjectId(id)},
                {"$set": {**new_comment}},
                )
            if result:
                result = self.get_comment(ObjectId(id))
                return result
        else:
            return {"message": "User not the original author of the comment"}

    def delete_comment(self, id, account_data):
        comment = self.get_comment(ObjectId(id))
        if comment['username'] == account_data['username']:
            db = client[dbname]
            result = db.Comments.delete_one(
                {"_id": ObjectId(id)},
            )

            if result:
                return {"object_deleted": True}
        else:
            return {"message": "User not the original author of the comment"}
