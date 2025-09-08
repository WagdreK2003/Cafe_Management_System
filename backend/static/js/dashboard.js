// Dashboard JavaScript for BrewHub Cafe Management System

class Dashboard {
    constructor() {
        this.initializeElements();
        this.loadDashboardData();
        this.setupEventListeners();
    }

    // Initialize DOM elements
    initializeElements() {
        this.elements = {
            todaySales: document.getElementById('today-sales'),
            activeOrders: document.getElementById('active-orders'),
            lowStock: document.getElementById('low-stock'),
            totalItems: document.getElementById('total-items'),
            topItems: document.getElementById('top-items'),
            recentActivity: document.getElementById('recent-activity')
        };
    }

    // Load dashboard data
    loadDashboardData() {
        const dashboardData = DataManager.getDashboardData();
        const salesData = DataManager.getSalesData();
        const inventoryStats = DataManager.getInventoryStats();
        const menuItems = DataManager.getMenuItems();

        // Update metric cards
        this.updateMetricCards(dashboardData, inventoryStats, menuItems);
        
        // Update top selling items
        this.updateTopItems(salesData.topItems);
        
        // Update recent activity
        this.updateRecentActivity();
    }

    // Update metric cards with animation
    updateMetricCards(dashboardData, inventoryStats, menuItems) {
        // Today's Sales
        if (this.elements.todaySales) {
            this.animateNumber(this.elements.todaySales, dashboardData.todaySales, '$');
        }

        // Active Orders
        if (this.elements.activeOrders) {
            this.animateNumber(this.elements.activeOrders, dashboardData.activeOrders);
        }

        // Low Stock Items
        if (this.elements.lowStock) {
            this.animateNumber(this.elements.lowStock, inventoryStats.lowStock);
        }

        // Total Menu Items
        if (this.elements.totalItems) {
            this.animateNumber(this.elements.totalItems, menuItems.length);
        }
    }

    // Animate number changes
    animateNumber(element, targetValue, prefix = '') {
        const startValue = 0;
        const duration = 1000;
        const steps = 60;
        const increment = (targetValue - startValue) / steps;
        const stepDuration = duration / steps;
        
        let currentValue = startValue;
        const animation = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(animation);
            }
            
            if (prefix === '$') {
                element.textContent = MainApp.formatCurrency(currentValue);
            } else {
                element.textContent = Math.round(currentValue).toLocaleString();
            }
        }, stepDuration);
    }

    // Update top selling items
    updateTopItems(topItems) {
        if (!this.elements.topItems) return;

        this.elements.topItems.innerHTML = '';
        
        topItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg top-item';
            itemElement.style.animationDelay = `${index * 0.1}s`;
            
            const rankColors = [
                'bg-amber-100 text-amber-700',
                'bg-gray-100 text-gray-700', 
                'bg-amber-800 text-amber-100'
            ];
            
            itemElement.innerHTML = `
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 ${rankColors[index] || 'bg-gray-100 text-gray-700'} rounded-full flex items-center justify-center">
                        <span class="font-bold text-sm">${index + 1}</span>
                    </div>
                    <div>
                        <p class="font-medium text-gray-800">${item.name}</p>
                        <p class="text-sm text-gray-500">${item.sales} sold today</p>
                    </div>
                </div>
                <span class="font-bold text-green-600">${MainApp.formatCurrency(item.revenue)}</span>
            `;
            
            this.elements.topItems.appendChild(itemElement);
        });
    }

    // Update recent activity
    updateRecentActivity() {
        if (!this.elements.recentActivity) return;

        const activities = [
            {
                type: 'order',
                icon: 'fa-check',
                color: 'bg-green-100 text-green-600',
                title: 'Order #1234 completed',
                time: '2 minutes ago',
                value: '$24.50'
            },
            {
                type: 'menu',
                icon: 'fa-plus',
                color: 'bg-amber-100 text-amber-600',
                title: 'New menu item added',
                time: '15 minutes ago',
                value: 'Chicken Wrap'
            },
            {
                type: 'inventory',
                icon: 'fa-exclamation',
                color: 'bg-red-100 text-red-600',
                title: 'Low stock alert',
                time: '1 hour ago',
                value: 'Milk'
            },
            {
                type: 'sales',
                icon: 'fa-chart-line',
                color: 'bg-blue-100 text-blue-600',
                title: 'Daily target achieved',
                time: '2 hours ago',
                value: '120%'
            }
        ];

        this.elements.recentActivity.innerHTML = '';
        
        activities.forEach((activity, index) => {
            const activityElement = document.createElement('div');
            activityElement.className = 'flex items-center space-x-3 p-3 bg-gray-50 rounded-lg activity-item';
            activityElement.style.animationDelay = `${index * 0.1}s`;
            
            activityElement.innerHTML = `
                <div class="w-8 h-8 ${activity.color} rounded-full flex items-center justify-center">
                    <i class="fa-solid ${activity.icon} text-sm"></i>
                </div>
                <div class="flex-1">
                    <p class="font-medium text-gray-800">${activity.title}</p>
                    <p class="text-sm text-gray-500">${activity.time}</p>
                </div>
                <span class="font-bold text-gray-600">${activity.value}</span>
            `;
            
            this.elements.recentActivity.appendChild(activityElement);
        });
    }

    // Setup event listeners
    setupEventListeners() {
        // Add click effects to metric cards
        const metricCards = document.querySelectorAll('.gradient-card');
        metricCards.forEach(card => {
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // Add hover effects to quick actions
        const quickActions = document.querySelectorAll('.quick-action');
        quickActions.forEach(action => {
            action.addEventListener('mouseenter', () => {
                action.style.transform = 'translateY(-2px)';
            });
            
            action.addEventListener('mouseleave', () => {
                action.style.transform = 'translateY(0)';
            });
        });

        // Refresh data every 30 seconds
        setInterval(() => {
            this.loadDashboardData();
        }, 30000);
    }

    // Show notification
    showNotification(message, type = 'info') {
        MainApp.showNotification(message, type);
    }

    // Export dashboard data
    exportDashboardData() {
        const dashboardData = DataManager.getDashboardData();
        const salesData = DataManager.getSalesData();
        
        const exportData = {
            dashboard: dashboardData,
            sales: salesData,
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showNotification('Dashboard data exported successfully!', 'success');
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dashboard;
}
