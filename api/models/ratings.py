from pydantic import BaseModel


class Rating(BaseModel):
    rating: int
    parkCode: str
    username: str


class RatingOut(BaseModel):
    ratings: list[Rating]
