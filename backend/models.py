from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

    # Initialize the SQLAlchemy object here. It will be linked to the app in app.py.
db = SQLAlchemy()

class Menu(db.Model):
        __tablename__ = 'menu_items'
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(255), nullable=False)
        price = db.Column(db.Float, nullable=False)
        image_url = db.Column(db.String(500))
        category = db.Column(db.String(100))
        created_at = db.Column(db.DateTime, server_default=func.now())

class Order(db.Model):
        __tablename__ = 'orders'
        id = db.Column(db.Integer, primary_key=True)
        total_amount = db.Column(db.Float, nullable=False)
        status = db.Column(db.String(50), nullable=False)
        created_at = db.Column(db.DateTime, server_default=func.now())

class Inventory(db.Model):
        __tablename__ = 'inventory_items'
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(255), nullable=False)
        quantity = db.Column(db.Integer, nullable=False)
        max_quantity = db.Column(db.Integer, nullable=False)
        unit = db.Column(db.String(50))
        status = db.Column(db.String(50))
    