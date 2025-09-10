    # app.py
    # This is the main Flask application file.
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
# Import the models and configuration
from backend.models import db, Menu, Order, Inventory
from backend.config import Config

# Initialize Flask app
app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

    # Configure the app using the Config class
app.config.from_object(Config)

    # Initialize the SQLAlchemy 'db' object with the app
db.init_app(app)

# ---- Add home route here ----
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/inventory')
def inventory():
    return render_template('inventory.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/pos')
def pos():
    return render_template('pos.html')

@app.route('/reports')
def reports():
    return render_template('reports.html')

    # --- API Endpoints ---
    # Endpoint to get all menu items
@app.route('/api/menu', methods=['GET'])
def get_menu():
        try:
            menu_items = Menu.query.all()
            result = [
                {
                    "id": item.id,
                    "name": item.name,
                    "price": item.price,
                    "image_url": item.image_url,
                    "category": item.category,
                } for item in menu_items
            ]
            return jsonify(result), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # Endpoint to add a new menu item
@app.route('/api/menu', methods=['POST'])
def add_menu_item():
        try:
            data = request.json
            new_item = Menu(
                name=data['name'],
                price=data['price'],
                image_url=data.get('image_url'),
                category=data.get('category')
            )
            db.session.add(new_item)
            db.session.commit()
            return jsonify({"message": "Menu item added successfully"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    # Endpoint to update a menu item
@app.route('/api/menu/<int:item_id>', methods=['PUT'])
def update_menu_item(item_id):
        try:
            item = Menu.query.get(item_id)
            if not item:
                return jsonify({"message": "Item not found"}), 404
            
            data = request.json
            item.name = data.get('name', item.name)
            item.price = data.get('price', item.price)
            item.image_url = data.get('image_url', item.image_url)
            item.category = data.get('category', item.category)
            
            db.session.commit()
            return jsonify({"message": "Menu item updated successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    # Endpoint to delete a menu item
@app.route('/api/menu/<int:item_id>', methods=['DELETE'])
def delete_menu_item(item_id):
        try:
            item = Menu.query.get(item_id)
            if not item:
                return jsonify({"message": "Item not found"}), 404
            
            db.session.delete(item)
            db.session.commit()
            return jsonify({"message": "Menu item deleted successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500


    # Endpoint to get all inventory items
@app.route('/api/inventory', methods=['GET'])
def get_inventory():
        try:
            inventory_items = Inventory.query.all()
            result = [
                {
                    "id": item.id,
                    "name": item.name,
                    "quantity": item.quantity,
                    "max_quantity": item.max_quantity,
                    "unit": item.unit,
                    "status": item.status,
                } for item in inventory_items
            ]
            return jsonify(result), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # Endpoint to update inventory (e.g., after a sale)
@app.route('/api/inventory/<int:item_id>', methods=['PUT'])
def update_inventory(item_id):
        try:
            item = Inventory.query.get(item_id)
            if not item:
                return jsonify({"message": "Item not found"}), 404
            
            data = request.json
            item.quantity = data.get('quantity', item.quantity)
            item.status = data.get('status', item.status)
            
            db.session.commit()
            return jsonify({"message": "Inventory updated successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    # Endpoint to add a new order
@app.route('/api/orders', methods=['POST'])
def add_order():
        try:
            data = request.json
            new_order = Order(
                total_amount=data['total_amount'],
                status='completed'
            )
            db.session.add(new_order)
            db.session.commit()
            return jsonify({"message": "Order added successfully"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    # Endpoint to get all orders
@app.route('/api/orders', methods=['GET'])
def get_orders():
        try:
            orders = Order.query.all()
            result = [
                {
                    "id": order.id,
                    "total_amount": order.total_amount,
                    "status": order.status,
                    "created_at": order.created_at.strftime("%Y-%m-%d %H:%M:%S")
                } for order in orders
            ]
            return jsonify(result), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # Endpoint for Dashboard data (example)
@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
        try:
            total_sales_obj = db.session.query(db.func.sum(Order.total_amount)).scalar()
            total_sales = float(total_sales_obj) if total_sales_obj else 0.0

            low_stock_count = Inventory.query.filter_by(status='Low Stock').count()

            latest_activity = [
                {"type": "sale", "message": f"New order: ${order.total_amount}", "time": order.created_at.strftime("%Y-%m-%d %H:%M:%S")} for order in Order.query.order_by(Order.created_at.desc()).limit(5)
            ]

            dashboard_data = {
                "total_sales": total_sales,
                "low_stock_count": low_stock_count,
                "latest_activity": latest_activity
            }
            return jsonify(dashboard_data), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
        # This block ensures that the database tables are created (if they don't exist)
        # and the app is run when the script is executed directly.
        with app.app_context():
            db.create_all()
        app.run(debug=True, port=5000)
    