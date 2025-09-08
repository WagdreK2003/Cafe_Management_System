// Data Management Module for BrewHub Cafe Management System

// Mock data for menu items with diverse food options
const menuData = [
    // Coffee & Beverages
    { 
        id: 1, 
        name: "Espresso", 
        price: 3.50, 
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop&crop=center", 
        category: "coffee",
        description: "Rich and bold single shot espresso"
    },
    { 
        id: 2, 
        name: "Cappuccino", 
        price: 4.25, 
        image: "https://images.unsplash.com/photo-1572442388796-11668a64e546?w=300&h=300&fit=crop&crop=center", 
        category: "coffee",
        description: "Perfectly balanced with steamed milk"
    },
    { 
        id: 3, 
        name: "Latte", 
        price: 4.50, 
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=300&h=300&fit=crop&crop=center", 
        category: "coffee",
        description: "Smooth and creamy with art"
    },
    { 
        id: 4, 
        name: "Mocha", 
        price: 5.00, 
        image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=300&h=300&fit=crop&crop=center", 
        category: "coffee",
        description: "Rich chocolate and espresso blend"
    },
    { 
        id: 5, 
        name: "Iced Coffee", 
        price: 4.00, 
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop&crop=center", 
        category: "cold",
        description: "Refreshing cold brew coffee"
    },
    { 
        id: 6, 
        name: "Americano", 
        price: 3.75, 
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop&crop=center", 
        category: "coffee",
        description: "Classic espresso with hot water"
    },
    { 
        id: 7, 
        name: "Green Tea", 
        price: 3.25, 
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center", 
        category: "tea",
        description: "Premium Japanese green tea"
    },
    { 
        id: 8, 
        name: "Hot Chocolate", 
        price: 4.25, 
        image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=300&h=300&fit=crop&crop=center", 
        category: "drinks",
        description: "Rich and creamy hot chocolate"
    },
    
    // Pastries & Desserts
    { 
        id: 9, 
        name: "Croissant", 
        price: 3.00, 
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=300&fit=crop&crop=center", 
        category: "pastries",
        description: "Buttery and flaky pastry"
    },
    { 
        id: 10, 
        name: "Blueberry Muffin", 
        price: 2.75, 
        image: "https://images.unsplash.com/photo-1607958996338-31aef7caefaa?w=300&h=300&fit=crop&crop=center", 
        category: "pastries",
        description: "Fresh baked with real blueberries"
    },
    { 
        id: 11, 
        name: "Chocolate Chip Cookie", 
        price: 2.50, 
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=300&fit=crop&crop=center", 
        category: "pastries",
        description: "Warm and gooey chocolate chip cookie"
    },
    { 
        id: 12, 
        name: "Smoothie Bowl", 
        price: 6.50, 
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop&crop=center", 
        category: "healthy",
        description: "Fresh fruit smoothie with granola"
    },
    
    // Fast Food - Burgers
    { 
        id: 13, 
        name: "Classic Burger", 
        price: 8.99, 
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop&crop=center", 
        category: "burgers",
        description: "Juicy beef patty with fresh vegetables"
    },
    { 
        id: 14, 
        name: "Cheese Burger", 
        price: 9.99, 
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=300&fit=crop&crop=center", 
        category: "burgers",
        description: "Classic burger with melted cheese"
    },
    { 
        id: 15, 
        name: "Chicken Burger", 
        price: 7.99, 
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300&h=300&fit=crop&crop=center", 
        category: "burgers",
        description: "Grilled chicken breast with lettuce"
    },
    { 
        id: 16, 
        name: "Veggie Burger", 
        price: 8.49, 
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300&h=300&fit=crop&crop=center", 
        category: "burgers",
        description: "Plant-based patty with fresh veggies"
    },
    
    // Fast Food - Pizza
    { 
        id: 17, 
        name: "Margherita Pizza", 
        price: 12.99, 
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=300&fit=crop&crop=center", 
        category: "pizza",
        description: "Classic tomato sauce with mozzarella"
    },
    { 
        id: 18, 
        name: "Pepperoni Pizza", 
        price: 14.99, 
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=300&fit=crop&crop=center", 
        category: "pizza",
        description: "Spicy pepperoni with melted cheese"
    },
    { 
        id: 19, 
        name: "BBQ Chicken Pizza", 
        price: 15.99, 
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center", 
        category: "pizza",
        description: "BBQ sauce with grilled chicken"
    },
    { 
        id: 20, 
        name: "Veggie Supreme Pizza", 
        price: 13.99, 
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop&crop=center", 
        category: "pizza",
        description: "Fresh vegetables with cheese"
    },
    
    // Chinese Food
    { 
        id: 21, 
        name: "Chicken Noodles", 
        price: 11.99, 
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop&crop=center", 
        category: "chinese",
        description: "Stir-fried noodles with chicken"
    },
    { 
        id: 22, 
        name: "Veg Noodles", 
        price: 10.99, 
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop&crop=center", 
        category: "chinese",
        description: "Stir-fried noodles with vegetables"
    },
    { 
        id: 23, 
        name: "Chicken Manchurian", 
        price: 13.99, 
        image: "https://images.unsplash.com/photo-1563379091339-03246963d6a6?w=300&h=300&fit=crop&crop=center", 
        category: "chinese",
        description: "Spicy chicken in Manchurian sauce"
    },
    { 
        id: 24, 
        name: "Veg Manchurian", 
        price: 12.99, 
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop&crop=center", 
        category: "chinese",
        description: "Vegetable balls in Manchurian sauce"
    },
    { 
        id: 25, 
        name: "Steamed Momos", 
        price: 8.99, 
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=300&fit=crop&crop=center", 
        category: "chinese",
        description: "Steamed dumplings with dipping sauce"
    },
    { 
        id: 26, 
        name: "Fried Momos", 
        price: 9.99, 
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=300&fit=crop&crop=center", 
        category: "chinese",
        description: "Crispy fried dumplings"
    },
    
    // Sandwiches & Wraps
    { 
        id: 27, 
        name: "Club Sandwich", 
        price: 7.99, 
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&h=300&fit=crop&crop=center", 
        category: "sandwiches",
        description: "Triple-decker with chicken and bacon"
    },
    { 
        id: 28, 
        name: "Veggie Wrap", 
        price: 6.99, 
        image: "https://images.unsplash.com/photo-1540713434306-58505db1b83f?w=300&h=300&fit=crop&crop=center", 
        category: "sandwiches",
        description: "Fresh vegetables in whole wheat wrap"
    },
    { 
        id: 29, 
        name: "Chicken Wrap", 
        price: 7.49, 
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center", 
        category: "sandwiches",
        description: "Grilled chicken with vegetables"
    },
    
    // Salads
    { 
        id: 30, 
        name: "Caesar Salad", 
        price: 8.99, 
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=300&fit=crop&crop=center", 
        category: "salads",
        description: "Fresh romaine with Caesar dressing"
    },
    { 
        id: 31, 
        name: "Greek Salad", 
        price: 9.99, 
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop&crop=center", 
        category: "salads",
        description: "Mediterranean vegetables with feta"
    },
    { 
        id: 32, 
        name: "Chicken Salad", 
        price: 10.99, 
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop&crop=center", 
        category: "salads",
        description: "Mixed greens with grilled chicken"
    }
];

// Mock data for inventory
const inventoryData = [
    { id: 1, name: "Coffee Beans", quantity: 50, maxQuantity: 60, unit: "kg", status: "In Stock" },
    { id: 2, name: "Milk", quantity: 15, maxQuantity: 50, unit: "liters", status: "Low Stock" },
    { id: 3, name: "Sugar", quantity: 30, maxQuantity: 40, unit: "kg", status: "In Stock" },
    { id: 4, name: "Blueberries", quantity: 5, maxQuantity: 20, unit: "kg", status: "Low Stock" },
    { id: 5, name: "Vanilla Extract", quantity: 8, maxQuantity: 15, unit: "liters", status: "Low Stock" },
    { id: 6, name: "Chocolate Syrup", quantity: 25, maxQuantity: 30, unit: "liters", status: "In Stock" },
    { id: 7, name: "Beef Patties", quantity: 45, maxQuantity: 60, unit: "kg", status: "In Stock" },
    { id: 8, name: "Chicken Breast", quantity: 35, maxQuantity: 50, unit: "kg", status: "In Stock" },
    { id: 9, name: "Pizza Dough", quantity: 20, maxQuantity: 30, unit: "kg", status: "In Stock" },
    { id: 10, name: "Tomato Sauce", quantity: 12, maxQuantity: 25, unit: "liters", status: "Low Stock" },
    { id: 11, name: "Mozzarella Cheese", quantity: 18, maxQuantity: 25, unit: "kg", status: "In Stock" },
    { id: 12, name: "Noodles", quantity: 25, maxQuantity: 40, unit: "kg", status: "In Stock" },
    { id: 13, name: "Soy Sauce", quantity: 8, maxQuantity: 15, unit: "liters", status: "Low Stock" },
    { id: 14, name: "Vegetables Mix", quantity: 15, maxQuantity: 30, unit: "kg", status: "In Stock" },
    { id: 15, name: "Bread Slices", quantity: 10, maxQuantity: 20, unit: "packets", status: "Low Stock" },
    { id: 16, name: "Lettuce", quantity: 8, maxQuantity: 15, unit: "kg", status: "Low Stock" }
];

// Current order state
let currentOrder = [];
const TAX_RATE = 0.10;

// Data management functions
class DataManager {
    // Menu management
    static getMenuItems() {
        return menuData;
    }

    static getMenuItemsByCategory(category) {
        return menuData.filter(item => item.category === category);
    }

    static addMenuItem(item) {
        const newItem = {
            id: menuData.length + 1,
            name: item.name,
            price: parseFloat(item.price),
            image: item.image || `https://placehold.co/100x100/79432d/ffffff?text=${item.name.substring(0, 5)}`,
            category: item.category || 'other',
            description: item.description || 'Delicious item'
        };
        menuData.push(newItem);
        return newItem;
    }

    static removeMenuItem(id) {
        const index = menuData.findIndex(item => item.id === id);
        if (index > -1) {
            menuData.splice(index, 1);
            return true;
        }
        return false;
    }

    // Order management
    static getCurrentOrder() {
        return currentOrder;
    }

    static addItemToOrder(item) {
        const existingItem = currentOrder.find(orderItem => orderItem.id === item.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            currentOrder.push({ ...item, quantity: 1 });
        }
        return currentOrder;
    }

    static removeItemFromOrder(id) {
        currentOrder = currentOrder.filter(item => item.id !== id);
        return currentOrder;
    }

    static clearOrder() {
        currentOrder = [];
        return currentOrder;
    }

    static getOrderTotal() {
        const subtotal = currentOrder.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;
        return { subtotal, tax, total };
    }

    static getOrderItemCount() {
        return currentOrder.reduce((acc, item) => acc + item.quantity, 0);
    }

    // Inventory management
    static getInventoryItems() {
        return inventoryData;
    }

    static updateInventoryItem(id, quantity) {
        const item = inventoryData.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            item.status = quantity === 0 ? "Out of Stock" : 
                         quantity < item.maxQuantity * 0.3 ? "Low Stock" : "In Stock";
            return item;
        }
        return null;
    }

    static getInventoryStats() {
        const stats = {
            inStock: 0,
            lowStock: 0,
            outOfStock: 0,
            total: inventoryData.length
        };

        inventoryData.forEach(item => {
            if (item.status === "In Stock") stats.inStock++;
            else if (item.status === "Low Stock") stats.lowStock++;
            else if (item.status === "Out of Stock") stats.outOfStock++;
        });

        return stats;
    }

    // Dashboard data
    static getDashboardData() {
        const orderTotal = this.getOrderTotal();
        const inventoryStats = this.getInventoryStats();
        
        return {
            todaySales: 1250.00,
            activeOrders: 15,
            lowStockItems: inventoryStats.lowStock,
            orderTotal: orderTotal.total,
            itemCount: this.getOrderItemCount()
        };
    }

    // Sales reports data
    static getSalesData() {
        return {
            dailySales: [1200, 1350, 1100, 1400, 1600, 1800, 1700],
            weeklySales: [8500, 9200, 8800, 9500, 10200, 9800, 10500],
            monthlySales: [45000, 48000, 52000, 49000, 55000, 58000],
            topItems: [
                { name: "Classic Burger", sales: 150, revenue: 1348.50 },
                { name: "Margherita Pizza", sales: 120, revenue: 1558.80 },
                { name: "Latte", sales: 200, revenue: 900.00 },
                { name: "Chicken Noodles", sales: 85, revenue: 1019.15 },
                { name: "Espresso", sales: 180, revenue: 630.00 }
            ]
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DataManager, menuData, inventoryData, currentOrder, TAX_RATE };
} 