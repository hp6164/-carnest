import random
from pymongo import MongoClient

def generate_random_address():
    # Sample data for address components
    streets = ['Main St', 'Elm St', 'Oak St', 'Pine St', 'Maple St']
    cities = ['Springfield', 'Rivertown', 'Lakeside', 'Hillview', 'Sunnyvale']
    states = ['CA', 'NY', 'TX', 'FL', 'PA']
    zip_codes = ['12345', '23456', '34567', '45678', '56789']

    # Generate random address
    street = f"{random.randint(100, 999)} {random.choice(streets)}"
    city = random.choice(cities)
    state = random.choice(states)
    zip_code = random.choice(zip_codes)
    return f"{street}, {city}, {state} {zip_code}"

# Connect to MongoDB (update the connection string as needed)
client = MongoClient('mongodb://localhost:27017/')
db = client.myDatabase
collection = db.listings

# Update each document in the collection with a random address
for document in collection.find():
    random_address = generate_random_address()
    collection.update_one({'_id': document['_id']}, {'$set': {'address': random_address}})

print("All listings have been updated with address fields.")