from fastapi.testclient import TestClient
from main import app
from queries.comment_queries import CommentQueries
from authenticator import authenticator
from pprint import pprint
from pydantic import BaseModel
from

client = TestClient(app)
# fake_secret_token = "fake_
class AccountOut(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: str
    id: str
    visited: list[str]
    bucket_list: list[str]
    avatar: dict

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

def test_create_comment():
    app.dependency_overrides[CommentQueries] = MockCommentQueries
    app.dependency_overrides[authenticator.get_current_account_data] = AccountOut
    MockCommentQueries.called = True
    json = {

    }
    expected = {
            "id": "string",
            "title": "string",
            "content": "string",
            "posted": "2023-09-06T19:23:22.352Z",
            "parkCode": "string",
            "username": "string",
            "parent_id": "string"
        }

    response = client.post("/api/comments")
    assert response == expected
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
