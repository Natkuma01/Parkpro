from fastapi.testclient import TestClient
from main import app
from queries.comment_queries import CommentQueries
from authenticator import authenticator
from pprint import pprint
from pydantic import BaseModel

client = TestClient(app)
# fake_secret_token = "fake_
# class AccountIn(BaseModel):
#     first_name: str
#     last_name: str
#     username: str
#     email: str
#     id: str
#     visited: list[str]
#     bucket_list: list[str]
#     avatar: dict

async def override_account(account_data: dict):
    return ({"account_data": account_data})

class MockCommentQueries:

    called = False
    def get_all_comments(self):
        return []

    def create_comment(self, comment, account_data):
        result = {
            "id": "string",
            "title": "string",
            "content": "string",
            "posted": "2023-09-07T21:59:03.748Z",
            "parkCode": "string",
            "username": "string",
            "parent_id": "string"
        }
        result.update(comment)
        return result

    def update_comment(self, id, comment, account_data):
        result = {
            "id": "string",
            "title": "string",
            "content": "string",
            "posted": "2023-09-07T21:59:03.748Z",
            "parkCode": "string",
            "username": "string",
            "parent_id": "string"
        }
        result.update(comment)
        return result

def test_update_comment():
    app.dependency_overrides[CommentQueries] = MockCommentQueries
    app.dependency_overrides[authenticator.get_current_account_data] = override_account
    MockCommentQueries.called = True
    json = {
        "id": "string",
        "title": "string",
        "content": "string",
        "posted": "2023-09-06T19:23:22.352000+00:00",
        "parkCode": "string",
        "username": "string",
        "parent_id": "string"
    }

    expected = {
        "id": "string",
        "title": "string",
        "content": "string",
        "posted": "2023-09-06T19:23:22.352000+00:00",
        "parkCode": "string",
        "username": "string",
        "parent_id": "string",
    }
    response = client.post("/api/comments", json=json)
    assert response.json() == expected
    assert response.status_code == 200
    assert MockCommentQueries.called
    app.dependency_overrides = {}

def test_create_comment():
    app.dependency_overrides[CommentQueries] = MockCommentQueries
    app.dependency_overrides[authenticator.get_current_account_data] = override_account
    MockCommentQueries.called = True
    json = {
        "id": "string",
        "title": "string",
        "content": "string",
        "posted": "2023-09-06T19:23:22.352000+00:00",
        "parkCode": "string",
        "username": "string",
        "parent_id": "string"
    }

    expected = {
        "id": "string",
        "title": "string",
        "content": "string",
        "posted": "2023-09-06T19:23:22.352000+00:00",
        "parkCode": "string",
        "username": "string",
        "parent_id": "string",
    }

    response = client.post("/api/comments", json=json)
    assert response.json() == expected
    assert response.status_code == 200
    assert MockCommentQueries.called
    app.dependency_overrides = {}


def test_get_all_comments():
    app.dependency_overrides[CommentQueries] = MockCommentQueries
    MockCommentQueries.called = True
    expected = {"comments": []}
    response = client.get("/api/comments")
    assert MockCommentQueries.called
    assert response.status_code == 200
    assert response.json() == expected
    app.dependency_overrides = {}







    # def update_comment(self, id, comment, account_data):

    # def delete_comment(self, id, account_data):
