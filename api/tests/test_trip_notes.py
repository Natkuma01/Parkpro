from fastapi.testclient import TestClient
from main import app
from queries.trip_notes import TripNoteQueries


client = TestClient(app)

class EmptyTripNoteQueries:
    def get_all_trip_notes(self):
        return []

def test_get_all_trip_notes():
    app.dependency_overrides[TripNoteQueries] = EmptyTripNoteQueries
    response = client.get("/api/trip_notes")
    assert response.status_code == 200
    assert response.json() == {"trip_notes":[]}
    app.dependency_overrides = {}
  
