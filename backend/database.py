import os
from dotenv import load_dotenv
import motor.motor_asyncio
from bson.objectid import ObjectId

# Load .env file
load_dotenv()

# Get the URI from the .env file
uri = os.getenv("MONGODB_URI")

client = motor.motor_asyncio.AsyncIOMotorClient(uri)
database = client.get_database("insurer_market_statistics")
insurer_collection = database.get_collection("insurance_companies")
exercises_collection = database.get_collection("financial_exercises")


def insurer_helper(insurer) -> dict:
    return {
        "id": str(insurer["_id"]),
        "name": insurer["name"],
        "ruc": insurer["ruc"],
    }
  

async def retrieve_insurer():
    insurers = []
    async for insurer in insurer_collection.find():
        insurers.append(insurer_helper(insurer))
    return insurers


async def get_financial_exercises_by_insurer(insurer_id):
    # Find the insurer by id
    insurer = await insurer_collection.find_one({'_id': insurer_id})

    if insurer:
        # Find the financial exercises by insurer_id
        exercises = []
        async for exercise in exercises_collection.find({'insurer_id': str(insurer_id)}):
            exercise["_id"] = str(exercise["_id"])  # convert ObjectId to string
            exercises.append(exercise)  # modify this line as needed to format the exercise data

        return exercises

    else:
        return None  # or raise an exception, or return an error message, etc.
    

async def add_financial_exercise(insurer_id, year, month, balance_general, estado_resultado, ingresos_egresos):
    # Prepare the document
    document = {
        "year": year,
        "month": month,
        "insurer_id": insurer_id,
        "balance_general": balance_general,
        "estado_resultado": estado_resultado,
        "ingresos_egresos": ingresos_egresos
    }

    # Insert the document into the collection
    result = await exercises_collection.insert_one(document)

    # Return the inserted document id
    return str(result.inserted_id)
""" 
Use example:
await add_financial_exercise(
    "801",
    "2024",
    "enero",
    {
        "total_activos": 782216071494,
        "total_pasivos": 80081829589,
        "capital_social": 53293900000,
        "resultado_ejercicio": 6830267547,
        "total_patrimonio_neto": 71470925871
    },
    {
        "primas_directas": 46376684483,
        "primas_reaseguros_aceptados_local": 253380162,
        "siniestros_seguros_directos": 20023178744,
        "resultado_tecnico_bruto": 14533685309,
        "gastos_produccion": 4888512431,
        "gastos_cesion_reaseguros_local": 0,
        "gastos_cesion_reaseguros_exterior": 1019168418,
        "gastos_tecnicos_explotacion": 13500766447,
        "constitucion_previsiones": 1803678087,
        "resultado_tecnico_neto": 4293989910,
        "resultado_total_ejercicio": 6830267547
    },
    {
        "resultado_ejercicio": 6830267547
    }
)
"""