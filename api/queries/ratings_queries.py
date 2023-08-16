from db import client, dbname
from models.ratings import Rating


class RatingQueries:
    def get_all_ratings(self):
        db = client[dbname]
        result = list(db.Rating.find())
        return result
    
    def update_rating(self, rating):
        db = client[dbname]
        result = db.Ratings.find_one(
            {"parkCode": rating.parkCode,
             "user_id": rating.user_id})
        result["rating"] = rating.rating
        return result
    
    def get_new_rating(self, id):
        db = client[dbname]
        result = db.Ratings.find_one({"_id": id})
        return result

    def create_rating(self, rating):
        db = client[dbname]
        result = db.Ratings.insert_one(rating.dict())
        if result.inserted_id:
            result = self.get_new_rating(result.inserted_id)
            return result