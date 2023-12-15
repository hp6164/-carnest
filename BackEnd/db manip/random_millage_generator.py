import random
from pymongo import MongoClient

def generate_random_millage():
    # Generate a random mileage number between 10,000 and 40,000
    return random.randint(10000, 40000)

# Connect to MongoDB (update the connection string as needed)
client = MongoClient('mongodb://localhost:27017/')
db = client.myDatabase
collection = db.listings

# Update each document in the collection with random mileage
for document in collection.find():
    random_millage = generate_random_millage()
    collection.update_one({'_id': document['_id']}, {'$set': {'millage': random_millage}})

print("All listings have been updated with random millage fields.")
