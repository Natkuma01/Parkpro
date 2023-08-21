from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import comment_routers, accounts, ratings, trip_notes, parks_routes
from authenticator import authenticator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(comment_routers.router)
app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(ratings.router)
app.include_router(trip_notes.router)
app.include_router(parks_routes.router)
