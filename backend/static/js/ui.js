// UI Components Module for BrewHub Cafe Management System

class UI {
    // Modal management
    static showModal(title, message, isConfirm = false, onConfirm = () => {}, onCancel = () => {}) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalMessage = document.getElementById('modal-message');
        const modalConfirmBtn = document.getElementById('modal-confirm');
        const modalCancelBtn = document.getElementById('modal-cancel');

        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        modalConfirmBtn.textContent = isConfirm ? 'Confirm' : 'OK';
        modalCancelBtn.style.display = isConfirm ? 'inline-block' : 'none';
        
        // Re-assign event listeners to prevent multiple bindings
        modalConfirmBtn.onclick = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            onConfirm();
        };
        modalCancelBtn.onclick = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            onCancel();
        };
    }

    // Page navigation
    static showPage(pageId) {
        const pageContents = document.querySelectorAll('.page-content');
        const pageLinks = document.querySelectorAll('.page-link');
        
        pageContents.forEach(page => {
            page.style.display = 'none';
        });
        document.getElementById(`${pageId}-page`).style.display = 'block';

        pageLinks.forEach(link => {
            link.classList.remove('active-link');
        });
        const activeLink = document.querySelector(`.page-link[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active-link');
        }
    }

    // Enhanced menu rendering with descriptions
    static renderMenuItems(container, menuData, onItemClick) {
        container.innerHTML = '';
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
            menuItem.addEventListener('click', () => {
                onItemClick(item);
                // Add success animation
                menuItem.classList.add('success-animation');
                setTimeout(() => menuItem.classList.remove('success-animation'), 1000);
            });
            container.appendChild(menuItem);
        });
    }

    // Order list rendering
    static renderOrderList(container, orderData, onRemoveItem) {
        container.innerHTML = '';
        if (orderData.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8">
                    <i class="fa-solid fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 font-medium">No items in the order.</p>
                    <p class="text-gray-400 text-sm mt-2">Click on menu items to add them</p>
                </div>
            `;
        } else {
            orderData.forEach((item, index) => {
                const orderItem = document.createElement('div');
                orderItem.className = "flex justify-between items-center py-3 border-b last:border-b-0 border-gray-200 order-item-enter bg-white rounded-lg mb-2 p-3 shadow-sm";
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
                container.appendChild(orderItem);
                setTimeout(() => orderItem.classList.add('order-item-enter-active'), 10);
            });
        }
    }

    // Order totals rendering
    static updateOrderTotals(subtotalSpan, taxSpan, totalSpan, orderData, taxRate) {
        const subtotal = orderData.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const tax = subtotal * taxRate;
        const total = subtotal + tax;
        
        // Animate the total changes
        UI.animateValue(subtotalSpan, subtotal.toFixed(2));
        UI.animateValue(taxSpan, tax.toFixed(2));
        UI.animateValue(totalSpan, total.toFixed(2));
    }

    // Value animation
    static animateValue(element, newValue) {
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

    // Item count update
    static updateItemCount(element, count) {
        if (element) {
            element.textContent = count;
            element.classList.add('success-animation');
            setTimeout(() => element.classList.remove('success-animation'), 1000);
        }
    }

    // Inventory table rendering
    static renderInventoryTable(container, inventoryData) {
        container.innerHTML = '';
        inventoryData.forEach((item, index) => {
            const percentage = (item.quantity / item.maxQuantity) * 100;
            const progressClass = percentage > 60 ? 'progress-fill' : percentage > 30 ? 'progress-fill warning' : 'progress-fill danger';
            
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50 transition-colors duration-200';
            row.style.animationDelay = `${index * 0.1}s`;
            
            const statusColor = item.status === "Low Stock" ? "text-rose-500 font-semibold" : "text-green-600";
            const statusIcon = item.status === "Low Stock" ? "fa-exclamation-triangle" : "fa-check-circle";
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                            <i class="fa-solid fa-box text-amber-600 text-sm"></i>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-gray-900">${item.name}</div>
                            <div class="text-xs text-gray-500">ID: ${item.id}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${item.quantity}</div>
                    <div class="text-xs text-gray-500">of ${item.maxQuantity} ${item.unit}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="progress-fill ${progressClass}" style="width: ${percentage}%"></div>
                    </div>
                    <div class="text-xs text-gray-500 mt-1">${percentage.toFixed(0)}%</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <i class="fa-solid ${statusIcon} mr-2 ${statusColor}"></i>
                        <span class="text-sm ${statusColor}">${item.status}</span>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-amber-600 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-lg transition-colors">
                        <i class="fa-solid fa-edit mr-1"></i>Update
                    </button>
                </td>
            `;
            container.appendChild(row);
        });
    }

    // Loading screen management
    static hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        const fab = document.getElementById('fab');
        
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
            
            if (fab) {
                fab.style.display = 'flex';
                setTimeout(() => fab.style.opacity = '1', 100);
            }
        }, 500);
    }

    // Search functionality
    static setupSearch(searchInput, menuItems) {
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                
                menuItems.forEach(item => {
                    const itemName = item.querySelector('span').textContent.toLowerCase();
                    if (itemName.includes(searchTerm)) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                    } else {
                        item.style.opacity = '0.5';
                        if (searchTerm.length > 2) {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UI;
} 