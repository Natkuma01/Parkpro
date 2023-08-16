from fastapi import APIRouter, Depends, Response
from queries.ratings_queries import RatingQueries as q
from models.ratings import Rating, RatingOut
from authenticator import authenticator

router = APIRouter(
    prefix='/api',
    tags=['ratings']
)


@router.get('/ratings', response_model=RatingOut)
def rating_list(queries: q = Depends()):
    return {
        "ratings": queries.get_all_ratings()
    }


@router.post('/ratings', response_model=Rating)
def create_rating(
    rating: Rating,
    queries: q = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
        ):
    return queries.create_rating(rating)


@router.put('/ratings/update', response_model=Rating)
def update_rating(
    rating: Rating,
    queries: q = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
        ):
    return queries.update_rating(rating)
