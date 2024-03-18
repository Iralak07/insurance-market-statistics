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