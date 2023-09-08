from db import client, dbname
from pprint import pprint


class RatingQueries:

    def get_all_ratings(self):
        db = client[dbname]
        result = list(db.Rating.find())
        return result

    def get_new_rating(self, id):
        db = client[dbname]
        result = db.Ratings.find_one({"_id": id})
        return result

    def update_or_create(self, rating, account_data):
        search = {
                "username": rating.username,
                "parkCode": rating.parkCode
        }
        new_rating = rating.dict()
        db = client[dbname]
        found = db.Ratings.find_one(search)
        if found:
            result = db.Ratings.update_one(
                search,
                {"$set": {**new_rating}},
                )
            if result:
                result = db.Ratings.find_one(search)
                result["id"] = str(result["_id"])
                return result
        else:
            result = db.Ratings.insert_one(rating.dict())
            if result.inserted_id:
                result = self.get_new_rating(result.inserted_id)
                return result
