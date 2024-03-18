from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from database import (
        retrieve_insurer,
        get_financial_exercises_by_insurer
)

from models import (
        Insurer,
)

router = APIRouter()

@router.get("/insurer")
async def get_all_insurers():
    return await retrieve_insurer()

@router.get("/insurer/{insurer_id}/exercises")
async def get_exercises_by_insurer(insurer_id: str):
    return await get_financial_exercises_by_insurer(insurer_id)