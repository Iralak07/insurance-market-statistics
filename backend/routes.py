from fastapi import APIRouter, Body, HTTPException
from fastapi.encoders import jsonable_encoder

from database import (
        retrieve_insurer,
        get_financial_exercises_by_insurer,
        upload_financial_exercise,
)

from models import (
        Insurer,
)

router = APIRouter()


@router.get("/insurer")
async def get_all_insurers():
    try:
        return await retrieve_insurer()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/insurer/{insurer_id}/exercises")
async def get_exercises_by_insurer(insurer_id: str):
    try:
        return await get_financial_exercises_by_insurer(insurer_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/insurer/exercises")
async def upload_exercise(data: dict):
    try:
        result = await upload_financial_exercise(data)
        return {"inserted_id": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
