import os
import json
import requests
from db import client, dbname
from routers.comment_routers import get_all_comments

class ParksQueries:
    def get_park_data(self):

        endpoint = f"https://developer.nps.gov/api/v1/parks?"
        HEADERS = {"X-Api-Key": os.environ["PARKS_API_KEY"], "limit": "500"}
        params = {"limit": "1000"}
        response = requests.get(endpoint, headers=HEADERS, params=params)
        content = json.loads(response.content)
        items = content['data']

        db = client[dbname]

        average_rating_list = db.Ratings.aggregate(
            [
                {
                    "$group":
                    {
                        "_id": "$parkCode",
                        "avgRating": {"$avg": "$rating"}
                    }
                }
            ]
        )

        comments_list = list(db.Comments.find())
        comments_list.sort(key=lambda x: x['posted'])
        comments_list.reverse()

        parks_list = []
        print(len(items))
        for item in items:
            if item["designation"] == "National Park":
                item["rating"] = 0
                item["comments"] = []
                for rating in list(average_rating_list):
                    if rating["_id"] == item["parkCode"]:
                        item["rating"] = rating['avgRating']
                        print(item["rating"], item["parkCode"])
                for comment in comments_list:
                    if comment["parkCode"] == item["parkCode"]:
                        comment["id"] = str(comment["_id"])
                        del comment["_id"]
                        item["comments"].append(comment)
                        print(item["comments"], item["parkCode"])

                parks_list.append(item)

        return parks_list
