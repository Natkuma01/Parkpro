from db import client, dbname
from bson.objectid import ObjectId


class TripNoteQueries:
    def get_all_trip_notes(self):
        db = client[dbname]
        result = list(db.TripNotes.find())
        for value in result:
            value["id"] = str(value["_id"])
        return result

    def get_trip_note(self, id):
        db = client[dbname]
        result = db.TripNotes.find_one({"_id": id})
        if result:
            result["id"] = result["_id"]
            return result

    def create_trip_note(self, trip_note):
        db = client[dbname]
        result = db.TripNotes.insert_one(trip_note.dict())
        if result.inserted_id:
            result = self.get_trip_note(result.inserted_id)
            result["id"] = str(result["id"])
            return result

    def update_trip_note(self, id, trip_note, account_data):
        new_trip_note = trip_note.dict()
        old_trip_note = self.get_trip_note(ObjectId(id))
        if old_trip_note['username'] == account_data['email']:
            db = client[dbname]
            result = db.TripNotes.update_one(
                {"_id": ObjectId(id)},
                {"$set": {**new_trip_note}},
                )
            if result:
                result = self.get_trip_note(ObjectId(id))
                result["id"] = str(result["_id"])
                return result
        else:
            return {"message": "User not the original author of the trip note"}

    def delete_trip_note(self, id, account_data):
        trip_note = self.get_trip_note(ObjectId(id))
        if trip_note['username'] == account_data['email']:
            db = client[dbname]
            result = db.TripNotes.delete_one(
                {"_id": ObjectId(id)},
            )
            if result:
                return {"object_deleted": True}
        else:
            return {"message": "User not the original author of the trip note"}
