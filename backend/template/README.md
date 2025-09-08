# BrewHub Cafe Management System

A modern, modular cafe management system built with HTML, CSS, and JavaScript. This system provides a complete solution for managing cafe operations including Point of Sale, Menu Management, Inventory Tracking, and Sales Reports.

## 🏗️ Project Structure

```
cafe_management_system/
├── index.html              # Main HTML file (modular version)
├── home.html              # Original single-file version
├── styles/
│   └── main.css          # All CSS styles and animations
├── js/
│   ├── data.js           # Data management and business logic
│   ├── ui.js             # UI components and rendering
│   └── app.js            # Main application controller
└── README.md             # This file
```

## 🚀 Features

### ✨ Enhanced User Experience
- **Smooth Animations**: Beautiful transitions and hover effects
- **Responsive Design**: Works perfectly on all devices
- **Loading Screen**: Professional loading experience
- **Keyboard Shortcuts**: Quick navigation (Ctrl/Cmd + 1-5)
- **Search Functionality**: Real-time menu item filtering

### 🛍️ Point of Sale (POS)
- **Interactive Menu**: Click to add items to order
- **Real-time Calculations**: Animated total updates
- **Order Management**: Add, remove, and cancel orders
- **Payment Processing**: Integrated payment workflow
- **Order Summary**: Item count and estimated time

### 📋 Menu Management
- **Add New Items**: Dynamic menu item creation
- **Edit Existing Items**: Modify prices and details
- **Delete Items**: Remove items from menu
- **Category Filtering**: Organize by type (coffee, food, etc.)

### 📦 Inventory Tracking
- **Stock Levels**: Visual progress bars
- **Status Indicators**: Color-coded stock status
- **Summary Cards**: Quick overview of inventory
- **Low Stock Alerts**: Automatic warnings

### 📊 Dashboard & Reports
- **Sales Analytics**: Daily and monthly reports
- **Performance Metrics**: Key business indicators
- **Top Selling Items**: Popular product tracking

## 🎨 Design Features

### Visual Enhancements
- **Gradient Backgrounds**: Beautiful color schemes
- **Hover Effects**: Interactive elements
- **Smooth Transitions**: Professional animations
- **Custom Scrollbars**: Enhanced user experience
- **Modal System**: Clean confirmation dialogs

### Interactive Elements
- **Floating Action Button**: Quick access to features
- **Enhanced Buttons**: Gradient effects and animations
- **Form Validation**: Real-time input feedback
- **Success Animations**: Visual confirmation of actions

## 🔧 Modular Architecture

### Data Layer (`js/data.js`)
```javascript
class DataManager {
    // Menu management
    static getMenuItems()
    static addMenuItem(item)
    static removeMenuItem(id)
    
    // Order management
    static getCurrentOrder()
    static addItemToOrder(item)
    static getOrderTotal()
    
    // Inventory management
    static getInventoryItems()
    static updateInventoryItem(id, quantity)
    static getInventoryStats()
}
```

### UI Layer (`js/ui.js`)
```javascript
class UI {
    // Modal management
    static showModal(title, message, isConfirm, onConfirm, onCancel)
    
    // Page navigation
    static showPage(pageId)
    
    // Rendering functions
    static renderMenuItems(container, menuData, onItemClick)
    static renderOrderList(container, orderData, onRemoveItem)
    static renderInventoryTable(container, inventoryData)
    
    // Animation utilities
    static animateValue(element, newValue)
    static updateItemCount(element, count)
}
```

### Application Layer (`js/app.js`)
```javascript
class BrewHubApp {
    constructor() {
        this.initializeElements()
        this.bindEvents()
        this.initializeApp()
    }
    
    // Event handling
    bindEvents()
    
    // Business logic
    addItemToOrder(item)
    removeItemFromOrder(itemId)
    cancelOrder()
    
    // Page management
    showPage(pageId)
    renderAllPages()
}
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)

### Installation
1. Clone or download the project files
2. Open `index.html` in your browser
3. Or serve the files using a local web server

### Development Setup
```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx serve .

# Using PHP (if installed)
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🎯 Usage

### Navigation
- **Dashboard**: Overview of business metrics
- **Point of Sale**: Process customer orders
- **Menu Management**: Manage menu items
- **Inventory**: Track stock levels
- **Sales Reports**: View business analytics

### Keyboard Shortcuts
- `Ctrl/Cmd + 1`: Dashboard
- `Ctrl/Cmd + 2`: Point of Sale
- `Ctrl/Cmd + 3`: Menu Management
- `Ctrl/Cmd + 4`: Inventory
- `Ctrl/Cmd + 5`: Sales Reports
- `Escape`: Close modals
- `Enter`: Confirm modal actions

### POS Operations
1. Click on menu items to add to order
2. Use search to find specific items
3. Remove items using the trash icon
4. Process payment or hold order
5. Cancel order if needed

## 🔄 Backend Integration

The modular structure makes it easy to integrate with backend services:

### API Integration Points
```javascript
// Replace DataManager methods with API calls
class DataManager {
    static async getMenuItems() {
        const response = await fetch('/api/menu-items')
        return response.json()
    }
    
    static async addMenuItem(item) {
        const response = await fetch('/api/menu-items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
        return response.json()
    }
}
```

### Database Schema
```sql
-- Menu Items
CREATE TABLE menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory
CREATE TABLE inventory_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    max_quantity INT NOT NULL,
    unit VARCHAR(50),
    status ENUM('In Stock', 'Low Stock', 'Out of Stock')
);
```

## 🎨 Customization

### Styling
Modify `styles/main.css` to customize:
- Color schemes
- Animations
- Layout styles
- Component appearances

### Functionality
Extend the modules in `js/` to add:
- New features
- Additional pages
- Custom business logic
- API integrations

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support or questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**BrewHub Cafe Management System** - Making cafe management beautiful and efficient! ☕ 