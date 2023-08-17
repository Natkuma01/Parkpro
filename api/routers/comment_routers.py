from fastapi import APIRouter, Depends, Response
from queries.comment_queries import CommentQueries as q
from models.comment_models import CommentIn, CommentOut, CommentsOut
from models.shared import Error, Message
from typing import Union
from authenticator import authenticator

router = APIRouter(
    prefix='/api',
    tags=['comments']
)


@router.get('/comments', response_model=CommentsOut)
def get_all_comments(queries: q = Depends()):
    return {
        "comments": queries.get_all_comments()
    }


@router.get('/comment/{comment_id}', response_model=CommentOut)
def get_comment(
    comment_id: str,
    response: Response,
    queries: q = Depends(),
):
    record = queries.get_comment(comment_id)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.post('/comments', response_model=CommentOut)
def create_comment(
    comment: CommentIn,
    queries: q = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.create_comment(comment)


@router.put('/comments/{comment_id}', response_model=CommentOut)
def update_comment(
    comment_id: str,
    comment: CommentIn,
    queries: q = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.update_comment(comment_id, comment)


@router.delete('/comments/{comment_id}', response_model={})
def delete_comment(
    comment_id: str,
    comment: CommentIn,
    queries: q = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.delete_comment(comment_id)
