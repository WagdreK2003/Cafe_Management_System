// POS JavaScript for BrewHub Cafe Management System

class POS {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadMenuItems();
        this.generateOrderNumber();
    }

    // Initialize DOM elements
    initializeElements() {
        this.elements = {
            menuItemsContainer: document.getElementById('menu-items'),
            orderList: document.getElementById('order-list'),
            subtotalSpan: document.getElementById('subtotal'),
            taxSpan: document.getElementById('tax'),
            totalSpan: document.getElementById('total'),
            itemCountElement: document.getElementById('item-count'),
            searchInput: document.getElementById('search-input'),
            categoryFilters: document.getElementById('category-filters'),
            processPaymentBtn: document.getElementById('process-payment'),
            holdOrderBtn: document.getElementById('hold-order'),
            cancelOrderBtn: document.getElementById('cancel-order'),
            paymentModal: document.getElementById('payment-modal'),
            paymentTotal: document.getElementById('payment-total'),
            paymentMethod: document.getElementById('payment-method'),
            cashPayment: document.getElementById('cash-payment'),
            cashAmount: document.getElementById('cash-amount'),
            cancelPaymentBtn: document.getElementById('cancel-payment'),
            confirmPaymentBtn: document.getElementById('confirm-payment'),
            orderNumber: document.getElementById('order-number'),
            estTime: document.getElementById('est-time')
        };
    }

    // Bind event listeners
    bindEvents() {
        // Menu item clicks
        this.elements.menuItemsContainer.addEventListener('click', (e) => {
            const itemElement = e.target.closest('.menu-item-card');
            if (itemElement && itemElement.dataset.id) {
                const itemId = parseInt(itemElement.dataset.id);
                const item = DataManager.getMenuItems().find(i => i.id === itemId);
                this.addItemToOrder(item);
            }
        });

        // Order list clicks
        this.elements.orderList.addEventListener('click', (e) => {
            if (e.target.closest('.remove-item')) {
                const itemId = parseInt(e.target.closest('.remove-item').dataset.id);
                this.removeItemFromOrder(itemId);
            }
        });

        // Search functionality
        this.elements.searchInput.addEventListener('input', (e) => {
            this.filterMenuItems(e.target.value);
        });

        // Category filtering
        this.elements.categoryFilters.addEventListener('click', (e) => {
            if (e.target.dataset.category) {
                this.filterByCategory(e.target.dataset.category);
            }
        });

        // Action buttons
        this.elements.processPaymentBtn.addEventListener('click', () => {
            this.showPaymentModal();
        });

        this.elements.holdOrderBtn.addEventListener('click', () => {
            this.holdOrder();
        });

        this.elements.cancelOrderBtn.addEventListener('click', () => {
            this.cancelOrder();
        });

        // Payment modal events
        this.elements.paymentMethod.addEventListener('change', (e) => {
            this.toggleCashPayment(e.target.value);
        });

        this.elements.cancelPaymentBtn.addEventListener('click', () => {
            this.hidePaymentModal();
        });

        this.elements.confirmPaymentBtn.addEventListener('click', () => {
            this.processPayment();
        });

        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    // Load menu items
    loadMenuItems() {
        const menuData = DataManager.getMenuItems();
        this.renderMenuItems(menuData);
    }

    // Render menu items
    renderMenuItems(menuData) {
        this.elements.menuItemsContainer.innerHTML = '';
        
        menuData.forEach((item, index) => {
            const menuItem = document.createElement('div');
            menuItem.className = "menu-item-card bg-white rounded-xl shadow-sm cursor-pointer p-4 flex flex-col items-center justify-center text-center group border border-gray-200";
            menuItem.dataset.id = item.id;
            menuItem.style.animationDelay = `${index * 0.1}s`;
            
            menuItem.innerHTML = `
                <div class="relative">
                    <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-full mb-2 border-2 border-gray-300 group-hover:border-amber-500 transition-all duration-300 group-hover:scale-110">
                    <div class="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">${item.id}</div>
                    <div class="absolute -bottom-1 -right-1 bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-1 font-medium capitalize" data-category="${item.category}">${item.category}</div>
                </div>
                <span class="text-sm font-semibold text-gray-800 group-hover:text-amber-700 transition-colors">${item.name}</span>
                <span class="text-xs text-gray-500 font-medium mb-1">$${item.price.toFixed(2)}</span>
                <p class="text-xs text-gray-600 mb-2 line-clamp-2">${item.description || 'Delicious item'}</p>
                <div class="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="text-xs bg-amber-500 text-white px-3 py-1 rounded-full hover:bg-amber-600 transition-colors font-medium">
                        <i class="fa-solid fa-plus mr-1"></i>Add to Order
                    </button>
                </div>
            `;
            
            this.elements.menuItemsContainer.appendChild(menuItem);
        });
    }

    // Add item to order
    addItemToOrder(item) {
        DataManager.addItemToOrder(item);
        this.renderOrderList();
        this.updateOrderTotals();
        this.updateItemCount();
        this.updateEstimatedTime();
        
        // Show success animation
        MainApp.showNotification(`${item.name} added to order!`, 'success');
    }

    // Remove item from order
    removeItemFromOrder(itemId) {
        const item = DataManager.getCurrentOrder().find(i => i.id === itemId);
        DataManager.removeItemFromOrder(itemId);
        this.renderOrderList();
        this.updateOrderTotals();
        this.updateItemCount();
        this.updateEstimatedTime();
        
        if (item) {
            MainApp.showNotification(`${item.name} removed from order!`, 'info');
        }
    }

    // Render order list
    renderOrderList() {
        const orderData = DataManager.getCurrentOrder();
        
        if (orderData.length === 0) {
            this.elements.orderList.innerHTML = `
                <div class="text-center py-8">
                    <i class="fa-solid fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 font-medium">No items in the order.</p>
                    <p class="text-gray-400 text-sm mt-2">Click on menu items to add them</p>
                </div>
            `;
        } else {
            this.elements.orderList.innerHTML = '';
            
            orderData.forEach((item, index) => {
                const orderItem = document.createElement('div');
                orderItem.className = "flex justify-between items-center py-3 border-b last:border-b-0 border-gray-200 order-item bg-white rounded-lg mb-2 p-3 shadow-sm";
                orderItem.style.animationDelay = `${index * 0.1}s`;
                
                orderItem.innerHTML = `
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                            <span class="text-xs font-bold text-amber-700">${item.quantity}</span>
                        </div>
                        <div>
                            <span class="font-medium text-gray-800">${item.name}</span>
                            <div class="flex items-center space-x-2 mt-1">
                                <span class="text-xs text-gray-500">$${item.price.toFixed(2)} each</span>
                                <span class="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Qty: ${item.quantity}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="font-bold text-gray-900 text-lg">$${(item.price * item.quantity).toFixed(2)}</span>
                        <button data-id="${item.id}" class="text-rose-500 hover:text-rose-700 remove-item p-2 hover:bg-rose-50 rounded-full transition-colors">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                `;
                
                this.elements.orderList.appendChild(orderItem);
            });
        }
    }

    // Update order totals
    updateOrderTotals() {
        const orderData = DataManager.getCurrentOrder();
        const totals = DataManager.getOrderTotal();
        
        this.animateValue(this.elements.subtotalSpan, totals.subtotal.toFixed(2));
        this.animateValue(this.elements.taxSpan, totals.tax.toFixed(2));
        this.animateValue(this.elements.totalSpan, totals.total.toFixed(2));
    }

    // Animate value changes
    animateValue(element, newValue) {
        const oldValue = parseFloat(element.textContent.replace('$', ''));
        const targetValue = parseFloat(newValue);
        const difference = targetValue - oldValue;
        const duration = 500;
        const steps = 20;
        const stepValue = difference / steps;
        const stepDuration = duration / steps;
        
        let currentStep = 0;
        const animation = setInterval(() => {
            currentStep++;
            const currentValue = oldValue + (stepValue * currentStep);
            element.textContent = `$${currentValue.toFixed(2)}`;
            
            if (currentStep >= steps) {
                element.textContent = `$${targetValue.toFixed(2)}`;
                clearInterval(animation);
            }
        }, stepDuration);
    }

    // Update item count
    updateItemCount() {
        const count = DataManager.getOrderItemCount();
        this.elements.itemCountElement.textContent = count;
        this.elements.itemCountElement.classList.add('success-animation');
        setTimeout(() => this.elements.itemCountElement.classList.remove('success-animation'), 1000);
    }

    // Update estimated time
    updateEstimatedTime() {
        const itemCount = DataManager.getOrderItemCount();
        let estimatedTime = '5-8 min';
        
        if (itemCount > 10) {
            estimatedTime = '12-15 min';
        } else if (itemCount > 5) {
            estimatedTime = '8-12 min';
        }
        
        this.elements.estTime.textContent = estimatedTime;
    }

    // Filter menu items by search
    filterMenuItems(searchTerm) {
        const menuItems = this.elements.menuItemsContainer.querySelectorAll('.menu-item-card');
        const term = searchTerm.toLowerCase();
        
        menuItems.forEach(item => {
            const itemName = item.querySelector('span').textContent.toLowerCase();
            if (itemName.includes(term)) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.opacity = '0.5';
                if (term.length > 2) {
                    item.style.display = 'none';
                }
            }
        });
    }

    // Filter by category
    filterByCategory(category) {
        // Update active button
        const buttons = this.elements.categoryFilters.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.remove('bg-amber-500', 'text-white');
        });
        
        const activeButton = this.elements.categoryFilters.querySelector(`[data-category="${category}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Filter menu items
        const menuItems = this.elements.menuItemsContainer.querySelectorAll('.menu-item-card');
        menuItems.forEach(item => {
            const itemCategory = item.querySelector('[data-category]')?.dataset.category;
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Show payment modal
    showPaymentModal() {
        const orderData = DataManager.getCurrentOrder();
        if (orderData.length === 0) {
            MainApp.showNotification('Please add items to the order first!', 'warning');
            return;
        }
        
        const totals = DataManager.getOrderTotal();
        this.elements.paymentTotal.textContent = MainApp.formatCurrency(totals.total);
        this.elements.paymentModal.classList.remove('hidden');
        this.elements.paymentModal.classList.add('flex');
    }

    // Hide payment modal
    hidePaymentModal() {
        this.elements.paymentModal.classList.add('hidden');
        this.elements.paymentModal.classList.remove('flex');
    }

    // Toggle cash payment field
    toggleCashPayment(method) {
        if (method === 'cash') {
            this.elements.cashPayment.classList.remove('hidden');
        } else {
            this.elements.cashPayment.classList.add('hidden');
        }
    }

    // Process payment
    processPayment() {
        const method = this.elements.paymentMethod.value;
        const totals = DataManager.getOrderTotal();
        
        if (method === 'cash') {
            const cashAmount = parseFloat(this.elements.cashAmount.value);
            if (!cashAmount || cashAmount < totals.total) {
                MainApp.showNotification('Please enter a valid amount!', 'error');
                return;
            }
            
            const change = cashAmount - totals.total;
            MainApp.showNotification(`Payment successful! Change: ${MainApp.formatCurrency(change)}`, 'success');
        } else {
            MainApp.showNotification('Payment processed successfully!', 'success');
        }
        
        this.completeOrder();
    }

    // Complete order
    completeOrder() {
        const orderData = DataManager.getCurrentOrder();
        const totals = DataManager.getOrderTotal();
        
        // Here you would typically save the order to a database
        console.log('Order completed:', {
            orderNumber: this.elements.orderNumber.textContent,
            items: orderData,
            total: totals.total,
            timestamp: new Date().toISOString()
        });
        
        // Clear the order
        DataManager.clearOrder();
        this.renderOrderList();
        this.updateOrderTotals();
        this.updateItemCount();
        this.updateEstimatedTime();
        this.generateOrderNumber();
        
        this.hidePaymentModal();
        MainApp.showNotification('Order completed successfully!', 'success');
    }

    // Hold order
    holdOrder() {
        const orderData = DataManager.getCurrentOrder();
        if (orderData.length === 0) {
            MainApp.showNotification('No items to hold!', 'warning');
            return;
        }
        
        MainApp.showNotification('Order held successfully!', 'info');
        // Here you would typically save the order to a held orders list
    }

    // Cancel order
    cancelOrder() {
        const orderData = DataManager.getCurrentOrder();
        if (orderData.length === 0) {
            MainApp.showNotification('No items to cancel!', 'warning');
            return;
        }
        
        if (confirm('Are you sure you want to cancel this order?')) {
            DataManager.clearOrder();
            this.renderOrderList();
            this.updateOrderTotals();
            this.updateItemCount();
            this.updateEstimatedTime();
            this.generateOrderNumber();
            
            MainApp.showNotification('Order cancelled!', 'info');
        }
    }

    // Generate order number
    generateOrderNumber() {
        const orderNumber = Math.floor(1000 + Math.random() * 9000);
        this.elements.orderNumber.textContent = orderNumber;
    }

    // Setup keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter to process payment
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.showPaymentModal();
            }
            
            // Escape to close payment modal
            if (e.key === 'Escape' && !this.elements.paymentModal.classList.contains('hidden')) {
                this.hidePaymentModal();
            }
            
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.elements.searchInput.focus();
            }
        });
    }
}

// Initialize POS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new POS();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = POS;
}