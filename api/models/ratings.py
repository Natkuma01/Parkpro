from pydantic import BaseModel

class Rating(BaseModel):
    rating: int
    parkCode: str
    user_id: str


class RatingOut(BaseModel):
    ratings: list[Rating]
