from fastapi import APIRouter, Depends
from queries.parks_queries import ParksQueries as q


router = APIRouter(
    prefix='/api',
    tags=['parks']
)


@router.get('/parks')
def get_park_data(queries: q = Depends()):
    return {
        "parks": queries.get_park_data()
    }
