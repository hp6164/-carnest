from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json
from functools import wraps
import pandas as pd
import requests
import psycopg2

app = Flask(__name__)
CORS(app)



