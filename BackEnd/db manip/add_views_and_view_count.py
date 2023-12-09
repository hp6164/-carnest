from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client.myDatabase
collection = db.listings

# Update each document in the collection
for document in collection.find():
    collection.update_one(
        {'_id': document['_id']},
        {'$set': {'views': [], 'views_count': 0}}
    )

print("All listings have been updated with views and views_count fields.")
