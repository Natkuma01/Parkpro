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


    def update_comment(self, id, comment):
        db = client[dbname]
        comment = comment.dict()
        result = db.Comments.update_one(
            {"_id": ObjectId(id)},
            {"$set": {**comment}},
            )
        if result:
            result = self.get_comment(ObjectId(id))
            result["id"] = str(result["_id"])
            return result


    def delete_comment(self, id):
        db = client[dbname]
        result = db.Comments.delete_one(
            {"_id": ObjectId(id)},
        )
        if result:
            return {"Comment deleted": True}
