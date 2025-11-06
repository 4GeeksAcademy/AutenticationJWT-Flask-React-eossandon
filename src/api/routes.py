"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import json
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.admin import setup_admin


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, supports_credentials=True, origins="*")


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/user', methods=['GET'])
def get_user():
    users = User.query.all()
    results = [user.serialize() for user in users]
    return jsonify(results), 200

# Crea una ruta para autenticar a los usuarios y devolver el token JWT
# La función create_access_token() se utiliza para generar el JWT


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email y contraseña requeridos"}), 400
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"error": "El email ya está registrado"}), 409

    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado correctamente"}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    if user.password != password:
        return jsonify({"msg": "Contraseña incorrecta"}), 401

    token = create_access_token(identity=user.id)

    return jsonify({"token": token, "msg": "Login exitoso"}), 200



@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({
        "id": user.id,
        "email": user.email
    }), 200
