import os
import json
import requests


class ParksQueries:
    def get_park_data(self):
        # Configure API request
        endpoint = f"https://developer.nps.gov/api/v1/parks?"
        HEADERS = {"X-Api-Key": os.environ["PARKS_API_KEY"], "limit": ""}
        params = {"limit": "1000"}
        response = requests.get(endpoint, headers=HEADERS, params=params)
        content = json.loads(response.content)
        items = content['data']
        result = []
        for item in items:
            if item['designation'] == "National Park":
                result.append(item)
        return result
