from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
from flask import send_from_directory
from bson.json_util import dumps
# import json
# from functools import wraps
# import pandas as pd
# import requests
# import psycopg2

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
    mongo.db.users.insert_one({'email': data['email'], 'password': hashed_password})
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
        return jsonify({'message': 'Logged in successfully'}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401


# Route to add listing
@app.route('/add_listing', methods=['POST'])
def add_listing():
    # Check for file part in the request
    if 'picture' not in request.files:
        return jsonify({'error': 'No picture part in the request'}), 400

    file = request.files['picture']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

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
            'picture': filename
        }

        mongo.db.listings.insert_one(new_listing)
        return jsonify({'message': 'Listing added successfully'}), 201
    else:
        return jsonify({'error': 'Invalid file type or no file uploaded'}), 400

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Route to get listings
@app.route('/get_listings', methods=['GET'])
def get_listings():
    listings = list(mongo.db.listings.find())
    return dumps(listings), 200


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
