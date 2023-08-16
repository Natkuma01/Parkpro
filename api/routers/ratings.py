from fastapi import APIRouter, Depends, Response
from queries.rating_queries import RatingQueries as q
from models.rating import Rating, RatingOut

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
def create_rating(rating: Rating, queries: q = Depends()):
    return queries.create_rating(rating)

@router.put('/ratings/{parkCode}/{user_id}', response_model=Rating)
def update_rating(rating: Rating, queries: q = Depends()):
    return queries.update_rating(rating)


