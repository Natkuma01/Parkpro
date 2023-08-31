from fastapi import APIRouter, Depends, Response
from queries.trip_notes import TripNoteQueries as q
from models.trip_notes import TripNoteIn, TripNoteOut, TripNotesOut
from models.shared import Error, Deleted
from typing import Union
from authenticator import authenticator

router = APIRouter(
    prefix='/api',
    tags=['trip_notes']
)


@router.get('/trip_notes', response_model=TripNotesOut)
def get_all_TripNotes(queries: q = Depends()):
    return {
        "trip_notes": queries.get_all_trip_notes()
    }


@router.get('/trip_note/{parkCode}', response_model=TripNoteOut)
def get_TripNote(
    parkCode: str,
    response: Response,
    queries: q = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    record = queries.get_trip_note(parkCode, account_data)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.post('/trip_notes', response_model=TripNoteOut)
def create_trip_note(
    trip_note: TripNoteIn,
    queries: q = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.create_trip_note(trip_note)


@router.put('/trip_notes/{trip_note_id}', response_model=Union[TripNoteOut, Error])
def update_trip_note(
    trip_note_id: str,
    trip_note: TripNoteIn,
    queries: q = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.update_trip_note(trip_note_id, trip_note, account_data)


@router.delete('/trip_notes/{trip_note_id}', response_model=Union[Deleted, Error])
def delete_trip_note(
    trip_note_id: str,
    trip_note: TripNoteIn,
    queries: q = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.delete_trip_note(trip_note_id, account_data)


@router.post('/note', response_model=TripNoteOut)
def update_or_create(
    note: TripNoteOut,
    queries: q = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.update_or_create(note, account_data)
