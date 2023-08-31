from db import client, dbname
from bson.objectid import ObjectId
from pprint import pprint


class TripNoteQueries:
    def get_all_trip_notes(self):
        db = client[dbname]
        result = list(db.Notes.find())
        for value in result:
            value["id"] = str(value["_id"])
        return result

    def get_trip_note(self, parkCode, account_data):
        db = client[dbname]
        result = db.notes.find_one(
            {"parkCode": parkCode,
             "username": account_data["username"]}
        )
        if result:
            result["id"] = str(result["_id"])
            return result
        else:
            result = {
                "id": None,
                "parkCode": parkCode,
                "username": account_data["username"],
                "content": None,
                "created": None,
                "updated": None,
            }
            return result

    def create_trip_note(self, trip_note):
        db = client[dbname]
        result = db.notes.insert_one(trip_note.dict())
        if result.inserted_id:
            result = self.get_trip_note(result.inserted_id)
            result["id"] = str(result["id"])
            return result

    def update_trip_note(self, trip_note, account_data):
        new_trip_note = trip_note.dict()
        old_trip_note = self.get_trip_note(ObjectId(trip_note.id))
        if old_trip_note['username'] == account_data['username']:
            db = client[dbname]
            result = db.Notes.update_one(
                {"_id": ObjectId(id)},
                {"$set": {**new_trip_note}},
                )
            if result:
                result = self.get_trip_note(ObjectId(trip_note.id))
                result["id"] = str(result["_id"])
                return result
        else:
            return {"message": "User not the original author of the trip note"}

    def delete_trip_note(self, id, account_data):
        trip_note = self.get_trip_note(ObjectId(id))
        if trip_note['username'] == account_data['email']:
            db = client[dbname]
            result = db.Notes.delete_one(
                {"_id": ObjectId(id)},
            )
            if result:
                return {"object_deleted": True}
        else:
            return {"message": "User not the original author of the trip note"}


    def update_or_create(self, note, account_data):
        new_note = note.dict()
        print(type(new_note["parkCode"]))
        search = {
                "username": account_data["username"],
                "parkCode": str(new_note["parkCode"])
        }

        db = client[dbname]
        found = db.notes.find_one(search)
        if found:
            result = db.notes.update_one(
                search,
                {"$set": {**new_note}},
            )
            if result:
                result = db.notes.find_one(search)
                result["id"] = str(result["_id"])
                return result
        else:
            result = db.notes.insert_one(new_note)
            if result.inserted_id:
                result = self.get_trip_note(new_note["parkCode"], account_data)
                return result
