from fastapi.testclient import TestClient
from main import app
from queries.ratings_queries import RatingQueries
from authenticator import authenticator

# Test by Peter Chiu

client = TestClient(app)


async def override_account(account_data: dict):
    return ({"account_data": account_data})


class MockRatingQueries:
    called = False
    def get_all_ratings(self):
        return []

def test_get_all_ratings():
    app.dependency_overrides[RatingQueries] = MockRatingQueries
    MockRatingQueries.called = True
    expected = {"ratings": []}
    response = client.get("/api/ratings")
    assert MockRatingQueries.called
    assert response.status_code == 200
    assert response.json() == expected
    app.dependency_overrides = {}
