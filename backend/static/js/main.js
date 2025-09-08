// Main JavaScript for BrewHub Cafe Management System

class MainApp {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.initializeApp();
    }

    // Initialize DOM elements
    initializeElements() {
        this.elements = {
            // Navigation
            sidebar: document.getElementById('sidebar'),
            openSidebarBtn: document.getElementById('open-sidebar'),
            closeSidebarBtn: document.getElementById('close-sidebar'),
            mainContent: document.getElementById('main-content'),
            loadingScreen: document.getElementById('loading-screen'),
            pageLinks: document.querySelectorAll('.page-link')
        };
    }

    // Bind event listeners
    bindEvents() {
        // Sidebar events
        if (this.elements.openSidebarBtn) {
            this.elements.openSidebarBtn.addEventListener('click', () => {
                this.openSidebar();
            });
        }

        if (this.elements.closeSidebarBtn) {
            this.elements.closeSidebarBtn.addEventListener('click', () => {
                this.closeSidebar();
            });
        }

        // Page navigation events
        this.elements.pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            });
        });

        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    // Initialize the application
    initializeApp() {
        // Simulate loading delay
        const minDelay = 2000;
        const maxRandomDelay = 1000;
        const delay = minDelay + Math.random() * maxRandomDelay;

        setTimeout(() => {
            this.hideLoadingScreen();
        }, delay);
    }

    // Loading screen management
    hideLoadingScreen() {
        if (this.elements.loadingScreen) {
            this.elements.loadingScreen.classList.add('fade-out');
            
            setTimeout(() => {
                this.elements.loadingScreen.style.display = 'none';
                if (this.elements.mainContent) {
                    this.elements.mainContent.style.display = 'block';
                }
            }, 500);
        }
    }

    // Sidebar management methods
    openSidebar() {
        if (this.elements.sidebar) {
            this.elements.sidebar.classList.add('open');
        }
        if (this.elements.mainContent) {
            this.elements.mainContent.classList.add('sidebar-open');
        }
    }

    closeSidebar() {
        if (this.elements.sidebar) {
            this.elements.sidebar.classList.remove('open');
        }
        if (this.elements.mainContent) {
            this.elements.mainContent.classList.remove('sidebar-open');
        }
    }

    // Keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Escape to close sidebar
            if (e.key === 'Escape') {
                this.closeSidebar();
            }
            
            // Ctrl/Cmd + B to toggle sidebar
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                if (this.elements.sidebar.classList.contains('open')) {
                    this.closeSidebar();
                } else {
                    this.openSidebar();
                }
            }
        });
    }

    // Utility methods
    static showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
        
        const colors = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            warning: 'bg-yellow-500 text-white',
            info: 'bg-blue-500 text-white'
        };
        
        notification.classList.add(colors[type] || colors.info);
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    static formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MainApp();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MainApp;
}
