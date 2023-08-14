from fastapi import APIRouter, Depends, Response
from queries.comment_queries import CommentQueries as q
from models.comment_models import CommentIn, CommentOut, CommentsOut

router = APIRouter(
    prefix='/api',
    tags=['comments']
)


@router.get('/comments', response_model=CommentsOut)
def comment_list(queries: q = Depends()):
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
def create_comment(comment: CommentIn, queries: q = Depends()):
    return queries.create_comment(comment)


@router.put('/comments/{comment_id}', response_model=CommentOut)
def update_comment(comment: CommentIn):
    pass
