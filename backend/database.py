
import motor.motor_asyncio
from bson.objectid import ObjectId
from config import MONGODB_URI

# Get the URI from the .env file
uri = MONGODB_URI


def setup_database(uri):
    client = motor.motor_asyncio.AsyncIOMotorClient(uri)
    database = client.get_database("insurer_market_statistics")
    insurer_collection = database.get_collection("insurance_companies")
    exercises_collection = database.get_collection("financial_exercises")

    return insurer_collection, exercises_collection


def insurer_helper(insurer) -> dict:
    return {
        "id": str(insurer["_id"]),
        "name": insurer["name"],
        "ruc": insurer["ruc"],
    }
  


async def retrieve_insurer() -> list[dict]:
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
    
    
async def get_field_value(insurer_id, year, month, field):
    # Find the document that matches the given parameters
    document = await exercises_collection.find_one({
        'insurer_id': insurer_id,
        'year': year,
        'month': month
    })

    if document:
        # Split the field into its components (e.g., 'balance_general.total_activos.$numberLong' becomes ['balance_general', 'total_activos', '$numberLong'])
        field_components = field.split('.')
        # Start with the entire document
        value = document
        # Traverse the document using the field components
        for component in field_components:
            value = value.get(component)  # Get the next component
            if value is None:
                # If a component doesn't exist, return None
                return None
        # If all components exist, return the final value
        return value
    else:
        return None


async def get_all_field_values(year, month, field):
    # Find all documents that match the given year and month
    cursor = exercises_collection.find({
        'year': year,
        'month': month
    })

    # Initialize an empty list to store the results
    results = []

    # Iterate over the documents
    async for document in cursor:
        # Get the field value using the get_field_value function
        value = await get_field_value(document['insurer_id'], year, month, field)
        if value is not None:
            # If the field value exist, find the insurer an add the result
            insurer = await insurer_collection.find_one({'_id': document['insurer_id']})
            if insurer:
                results.append({
                    'insurer_name': insurer['name'],
                    'value': value
                })

    # Return the results
    return results        


async def upload_financial_exercise(data) -> str:
    # Insert the document into the collection
    result = await exercises_collection.insert_one(data)
    # Return the inserted document id
    return str(result.inserted_id)



insurer_collection, exercises_collection = setup_database(uri)