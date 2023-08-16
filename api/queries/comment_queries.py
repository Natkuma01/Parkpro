from db import client, dbname


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
