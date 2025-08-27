// Main Application Controller for BrewHub Cafe Management System

class BrewHubApp {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.initializeApp();
    }

    // Initialize DOM elements
    initializeElements() {
        this.elements = {
            // Navigation
            pageLinks: document.querySelectorAll('.page-link'),
            sidebar: document.getElementById('sidebar'),
            openSidebarBtn: document.getElementById('open-sidebar'),
            closeSidebarBtn: document.getElementById('close-sidebar'),
            mainContent: document.getElementById('main-content'),
            loadingScreen: document.getElementById('loading-screen'),

            // POS Elements
            menuItemsContainer: document.getElementById('menu-items'),
            orderList: document.getElementById('order-list'),
            subtotalSpan: document.getElementById('subtotal'),
            taxSpan: document.getElementById('tax'),
            totalSpan: document.getElementById('total'),
            cancelOrderButton: document.getElementById('cancel-order'),
            itemCountElement: document.getElementById('item-count'),

            // Menu Management
            existingMenuItemsContainer: document.getElementById('existing-menu-items'),
            addItemForm: document.getElementById('add-item-form'),

            // Inventory
            inventoryTableBody: document.getElementById('inventory-table-body'),

            // Modal
            modal: document.getElementById('modal'),
            modalTitle: document.getElementById('modal-title'),
            modalMessage: document.getElementById('modal-message'),
            modalConfirmBtn: document.getElementById('modal-confirm'),
            modalCancelBtn: document.getElementById('modal-cancel'),

            // Floating Action Button
            fab: document.getElementById('fab')
        };
    }

    // Bind event listeners
    bindEvents() {
        // Navigation events
        this.elements.pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = e.target.closest('.page-link').dataset.page;
                this.showPage(pageId);
                this.closeSidebar();
            });
        });

        // Sidebar events
        this.elements.openSidebarBtn.addEventListener('click', () => {
            this.openSidebar();
        });

        this.elements.closeSidebarBtn.addEventListener('click', () => {
            this.closeSidebar();
        });

        // POS events
        this.elements.menuItemsContainer.addEventListener('click', (e) => {
            const itemElement = e.target.closest('div');
            if (itemElement && itemElement.dataset.id) {
                const itemId = parseInt(itemElement.dataset.id);
                const item = DataManager.getMenuItems().find(i => i.id === itemId);
                this.addItemToOrder(item);
            }
        });

        this.elements.orderList.addEventListener('click', (e) => {
            if (e.target.closest('.remove-item')) {
                const itemId = parseInt(e.target.closest('.remove-item').dataset.id);
                this.removeItemFromOrder(itemId);
            }
        });

        this.elements.cancelOrderButton.addEventListener('click', () => {
            this.cancelOrder();
        });

        // Menu management events
        this.elements.addItemForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewMenuItem();
        });

        // Keyboard shortcuts
        this.setupKeyboardShortcuts();

        // Enhanced interactions
        this.setupEnhancedInteractions();
    }

    // Initialize the application
    initializeApp() {
        // Simulate loading delay
        const minDelay = 3000;
        const maxRandomDelay = 1500;
        const delay = minDelay + Math.random() * maxRandomDelay;

        setTimeout(() => {
            UI.hideLoadingScreen();
            
            // Initialize all pages
            this.showPage('pos');
            this.renderAllPages();
            
                    // Setup search functionality
        const searchInput = document.querySelector('input[placeholder="Search menu..."]');
        const menuItems = document.querySelectorAll('#menu-items > div');
        UI.setupSearch(searchInput, menuItems);
        
        // Setup category filtering
        this.setupCategoryFiltering();
        }, delay);
    }

    // Page navigation
    showPage(pageId) {
        UI.showPage(pageId);
        this.updateActivePage(pageId);
    }

    updateActivePage(pageId) {
        // Update any page-specific functionality
        switch(pageId) {
            case 'pos':
                this.updatePOSDisplay();
                break;
            case 'inventory':
                this.updateInventoryDisplay();
                break;
            case 'dashboard':
                this.updateDashboardDisplay();
                break;
        }
    }

    // Render all pages
    renderAllPages() {
        this.renderMenuItems();
        this.renderOrderList();
        this.renderExistingMenuItems();
        this.renderInventory();
    }

    // POS functionality
    renderMenuItems() {
        const menuData = DataManager.getMenuItems();
        UI.renderMenuItems(this.elements.menuItemsContainer, menuData, (item) => {
            this.addItemToOrder(item);
        });
    }

    renderOrderList() {
        const orderData = DataManager.getCurrentOrder();
        UI.renderOrderList(this.elements.orderList, orderData, (itemId) => {
            this.removeItemFromOrder(itemId);
        });
        this.updateOrderTotals();
    }

    addItemToOrder(item) {
        DataManager.addItemToOrder(item);
        this.renderOrderList();
        this.updateItemCount();
    }

    removeItemFromOrder(itemId) {
        DataManager.removeItemFromOrder(itemId);
        this.renderOrderList();
        this.updateItemCount();
    }

    cancelOrder() {
        UI.showModal('Cancel Order', 'Are you sure you want to cancel this order?', true, () => {
            DataManager.clearOrder();
            this.renderOrderList();
            UI.showModal('Order Cancelled', 'The order has been cancelled successfully.');
        });
    }

    updateOrderTotals() {
        const orderData = DataManager.getCurrentOrder();
        const totals = DataManager.getOrderTotal();
        
        UI.updateOrderTotals(
            this.elements.subtotalSpan,
            this.elements.taxSpan,
            this.elements.totalSpan,
            orderData,
            DataManager.TAX_RATE
        );
    }

    updateItemCount() {
        const count = DataManager.getOrderItemCount();
        UI.updateItemCount(this.elements.itemCountElement, count);
    }

    updatePOSDisplay() {
        this.renderMenuItems();
        this.renderOrderList();
    }

    // Enhanced menu management functionality
    renderExistingMenuItems() {
        const menuData = DataManager.getMenuItems();
        this.elements.existingMenuItemsContainer.innerHTML = '';
        
        menuData.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = "bg-white p-4 rounded-lg shadow-sm flex items-center justify-between border border-gray-200 hover:shadow-md transition-shadow";
            menuItem.innerHTML = `
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                        <div class="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">${item.id}</div>
                    </div>
                    <div>
                        <span class="font-semibold text-gray-800">${item.name}</span>
                        <p class="text-gray-500 text-sm">$${item.price.toFixed(2)}</p>
                        <p class="text-gray-400 text-xs line-clamp-1">${item.description || 'Delicious item'}</p>
                        <span class="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mt-1 capitalize">${item.category}</span>
                    </div>
                </div>
                <div class="space-x-2">
                    <button class="px-3 py-1 text-sm bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors">
                        <i class="fa-solid fa-edit mr-1"></i>Edit
                    </button>
                    <button data-id="${item.id}" class="px-3 py-1 text-sm bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors delete-menu-item">
                        <i class="fa-solid fa-trash mr-1"></i>Delete
                    </button>
                </div>
            `;
            this.elements.existingMenuItemsContainer.appendChild(menuItem);
        });
    }

    addNewMenuItem() {
        const itemName = document.getElementById('itemName').value;
        const itemPrice = parseFloat(document.getElementById('itemPrice').value);
        const itemImage = document.getElementById('itemImage').value;
        
        const newItem = {
            name: itemName,
            price: itemPrice,
            image: itemImage,
            category: 'other'
        };
        
        DataManager.addMenuItem(newItem);
        UI.showModal('Success', `${itemName} has been added to the menu.`);
        this.elements.addItemForm.reset();
        this.renderMenuItems();
        this.renderExistingMenuItems();
    }

    // Inventory functionality
    renderInventory() {
        const inventoryData = DataManager.getInventoryItems();
        UI.renderInventoryTable(this.elements.inventoryTableBody, inventoryData);
    }

    updateInventoryDisplay() {
        this.renderInventory();
    }

    // Dashboard functionality
    updateDashboardDisplay() {
        const dashboardData = DataManager.getDashboardData();
        // Update dashboard cards with real data
        // This would be implemented based on your specific dashboard requirements
    }

    // Keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + 1-5 for navigation
            if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '5') {
                e.preventDefault();
                const pages = ['dashboard', 'pos', 'menu', 'inventory', 'reports'];
                const pageIndex = parseInt(e.key) - 1;
                if (pages[pageIndex]) {
                    this.showPage(pages[pageIndex]);
                }
            }
            
            // Escape to close modal
            if (e.key === 'Escape' && !this.elements.modal.classList.contains('hidden')) {
                this.elements.modal.classList.add('hidden');
                this.elements.modal.classList.remove('flex');
            }
            
            // Enter to confirm modal
            if (e.key === 'Enter' && !this.elements.modal.classList.contains('hidden')) {
                this.elements.modalConfirmBtn.click();
            }
        });
    }

    // Enhanced interactions
    setupEnhancedInteractions() {
        // Add hover effects to dashboard cards
        const dashboardCards = document.querySelectorAll('.gradient-card');
        dashboardCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add click effects to buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    // Sidebar management methods
    openSidebar() {
        this.elements.sidebar.classList.add('open');
        this.elements.mainContent.classList.add('sidebar-open');
    }

    closeSidebar() {
        this.elements.sidebar.classList.remove('open');
        this.elements.mainContent.classList.remove('sidebar-open');
    }

    // Setup category filtering
    setupCategoryFiltering() {
        const categoryButtons = document.querySelectorAll('[data-category]');
        const menuItems = document.querySelectorAll('#menu-items > div');
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                
                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('bg-amber-500', 'text-white'));
                button.classList.add('bg-amber-500', 'text-white');
                
                // Filter menu items
                menuItems.forEach(item => {
                    const itemCategory = item.querySelector('[data-category]')?.dataset.category;
                    if (category === 'all' || itemCategory === category) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BrewHubApp();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrewHubApp;
} 