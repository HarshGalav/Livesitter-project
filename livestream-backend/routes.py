from flask import Blueprint, request, jsonify
from models import overlays
from bson.objectid import ObjectId
from bson.errors import InvalidId
import logging
from bson import json_util
import json

api = Blueprint('api', __name__)

@api.route('/overlays', methods=['POST'])
def create_overlay():
    data = request.json
    overlay_id = overlays.insert_one(data).inserted_id
    return jsonify({"id": str(overlay_id)}), 201

@api.route('/overlays', methods=['GET'])
def get_overlays():
    all_overlays = list(overlays.find())
    # Convert ObjectId to string
    for overlay in all_overlays:
        overlay['_id'] = str(overlay['_id'])
    return jsonify(all_overlays), 200

@api.route('/overlays/<id>', methods=['PUT'])
def update_overlay(id):
    data = request.json
    updated = overlays.update_one({"_id": ObjectId(id)}, {"$set": data})
    if updated.matched_count:
        return jsonify({"message": "Overlay updated"}), 200
    else:
        return jsonify({"message": "Overlay not found"}), 404

@api.route('/overlays/<id>', methods=['DELETE'])
def delete_overlay(id):
    try:
        result = overlays.delete_one({"_id": ObjectId(id)})
        if result.deleted_count:
            return jsonify({"message": "Overlay deleted"}), 200
        else:
            return jsonify({"message": "Overlay not found"}), 404
    except InvalidId:
        return jsonify({"error": f"Invalid overlay ID format: {id}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
