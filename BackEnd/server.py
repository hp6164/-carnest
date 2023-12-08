from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
from flask import send_from_directory
from bson.json_util import dumps
import subprocess

# import json
# from functools import wraps
# import pandas as pd
# import requests
# import psycopg2

subprocess.Popen(["/Users/majd/PycharmProjects/CarNest/BackEnd/start_mongodb.sh"])

app = Flask(__name__)
CORS(app)

# Configure the MongoDB settings: these should be replaced with your MongoDB connection details
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"

# Initialize PyMongo with the Flask app
mongo = PyMongo(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max upload size, e.g., 16MB

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Route to signup
@app.route('/signup', methods=['POST'])
def signup():
    if not request.is_json:
        return jsonify({'error': 'Request must be JSON'}), 400

    data = request.get_json()
    if 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email and password required'}), 400

    # Check if user already exists
    if mongo.db.users.find_one({'email': data['email']}):
        return jsonify({'error': 'User already exists'}), 409

    hashed_password = generate_password_hash(data['password'])
    mongo.db.users.insert_one({'email': data['email'], 'is_admin': False, 'password': hashed_password})
    return jsonify({'message': 'User created successfully'}), 201


# Route to signin
@app.route('/signin', methods=['POST'])
def signin():
    if not request.is_json:
        return jsonify({'error': 'Request must be JSON'}), 400

    data = request.get_json()
    if 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email and password required'}), 400

    user = mongo.db.users.find_one({'email': data['email']})
    if user and check_password_hash(user['password'], data['password']):
        user_role = 'admin' if user.get('is_admin', False) else 'user'
        return jsonify({'message': 'Logged in successfully', 'role': user_role}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401


# Route to add listing
@app.route('/add_listing', methods=['POST'])
def add_listing():
    # Check for file part in the request
    files = request.files.getlist('pictures')  # Retrieve multiple files

    if not files or all(file.filename == '' for file in files):
        return jsonify({'error': 'No selected file'}), 400

    filenames = []
    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            filenames.append(filename)
        else:
            return jsonify({'error': 'Invalid file type or no file uploaded'}), 400

    # Handle other form data
    make = request.form.get('make')
    model = request.form.get('model')
    year = request.form.get('year')
    price = request.form.get('price')

    new_listing = {
        'make': make,
        'model': model,
        'year': year,
        'price': price,
        'pictures': filenames  # Store filenames as a list
    }

    mongo.db.listings.insert_one(new_listing)
    return jsonify({'message': 'Listing added successfully'}), 201


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


# Route to get listings
@app.route('/get_listings', methods=['GET'])
def get_listings():
    listings = list(mongo.db.listings.find())
    return dumps(listings), 200
from bson.objectid import ObjectId


@app.route('/delete_listing/<listing_id>', methods=['DELETE'])
def delete_listing(listing_id):
    def is_user_admin(email):
        user = mongo.db.users.find_one({'email': email})
        if user:
            return user.get('is_admin', False)
        else:
            return False

            # This should be replaced with a secure way to identify the user (e.g., token)
    user_email = request.args.get('email')

    if not is_user_admin(user_email):
        return jsonify({'error': 'Unauthorized access'}), 401

    # Find the listing to get the picture filenames
    listing = mongo.db.listings.find_one({'_id': ObjectId(listing_id)})
    if not listing:
        return jsonify({'error': 'Listing not found'}), 404

    # Delete pictures associated with the listing
    for picture in listing.get('pictures', []):
        picture_path = os.path.join(app.config['UPLOAD_FOLDER'], picture)
        if os.path.exists(picture_path):
            os.remove(picture_path)

    # Delete the listing from the database
    result = mongo.db.listings.delete_one({'_id': ObjectId(listing_id)})
    if result.deleted_count:
        return jsonify({'message': 'Listing and associated pictures deleted successfully'}), 200
    else:
        return jsonify({'error': 'Error deleting listing'}), 500


@app.teardown_appcontext
def shutdown_session(exception=None):
    subprocess.call(["/Users/majd/PycharmProjects/CarNest/BackEnd/stop_mongodb.sh"])


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
