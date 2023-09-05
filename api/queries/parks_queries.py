import os
import json
import requests
from db import client, dbname
from routers.comment_routers import get_all_comments
from pprint import pprint

class ParksQueries:
    def get_park_data(self):

        endpoint = f"https://developer.nps.gov/api/v1/parks?"
        HEADERS = {"X-Api-Key": os.environ["PARKS_API_KEY"], "limit": "1500"}
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

        average_rating_list = list(average_rating_list)

        comments_list = list(db.Comments.find())
        comments_list.sort(key=lambda x: x['posted'])
        comments_list.reverse()

        parks_list = []

        for item in items:
            if item["designation"] == "National Park":
                item["rating"] = 0
                item["comments"] = []
                parks_list.append(item)

        for park in parks_list:
            park["fullName"] = park["fullName"].replace(" National Park", "")
            for rating in average_rating_list:
                if rating["_id"] == park["parkCode"]:
                    park["rating"] = rating['avgRating']
            for comment in comments_list:
                if comment["parkCode"] == park["parkCode"]:
                    comment["id"] = str(comment["_id"])
                    del comment["_id"]
                    park["comments"].append(comment)

        return parks_list
