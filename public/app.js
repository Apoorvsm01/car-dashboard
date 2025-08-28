/**
 * Carvo Dashboard - Main Application
 * Manages all dashboard components and their interactions
 */

class CarvoDashboard {
    constructor() {
        this.components = {};
        this.isInitialized = false;
        this.init();
    }

    async init() {
        try {
            console.log('🚀 CarvoDashboard: Starting initialization...');
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Wait for external libraries to load
            await this.waitForLibraries();
            
            // Initialize components
            await this.initializeComponents();
            
            // Set up global event listeners
            this.setupGlobalEventListeners();
            
            // Start real-time updates
            this.startRealTimeUpdates();
            
            this.isInitialized = true;
            console.log('✅ CarvoDashboard: Initialization complete');
            
        } catch (error) {
            console.error('❌ CarvoDashboard: Initialization failed:', error);
        }
    }

    async waitForLibraries() {
        console.log('📚 CarvoDashboard: Waiting for libraries...');
        
        // Wait for Leaflet
        let attempts = 0;
        while (typeof L === 'undefined' && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (typeof L === 'undefined') {
            throw new Error('Leaflet library failed to load');
        }
        
        console.log('✅ CarvoDashboard: Libraries loaded successfully');
    }

    async initializeComponents() {
        console.log('🔧 CarvoDashboard: Initializing components...');
        
        try {
            // Initialize Statistics Component
            if (typeof StatisticsComponent !== 'undefined') {
                this.components.statistics = new StatisticsComponent();
                console.log('✅ Statistics component initialized');
            } else {
                console.error('❌ StatisticsComponent not found');
            }

            // Initialize Map Component
            if (typeof MapComponent !== 'undefined') {
                this.components.map = new MapComponent();
                console.log('✅ Map component initialized');
            } else {
                console.error('❌ MapComponent not found');
            }

            // Initialize Calendar (replacing old schedule)
            console.log('🔧 Initializing calendar...');
            this.initCalendar();

            // Initialize Orders Component
            if (typeof OrdersComponent !== 'undefined') {
                this.components.orders = new OrdersComponent();
                console.log('✅ Orders component initialized');
            } else {
                console.error('❌ OrdersComponent not found');
            }

            // Initialize Spotlight Component
            if (typeof SpotlightComponent !== 'undefined') {
                this.components.spotlight = new SpotlightComponent();
                console.log('✅ Spotlight component initialized');
            } else {
                console.error('❌ SpotlightComponent not found');
            }

            // Set up component interactions
            this.setupComponentInteractions();
            
            // Force render all components
            await this.renderAllComponents();
            
        } catch (error) {
            console.error('❌ Component initialization failed:', error);
        }
    }

    async renderAllComponents() {
        console.log('🎨 CarvoDashboard: Rendering all components...');
        
        // Render statistics
        if (this.components.statistics && typeof this.components.statistics.render === 'function') {
            this.components.statistics.render();
            console.log('✅ Statistics rendered');
        }
        
        // Render map
        if (this.components.map && typeof this.components.map.render === 'function') {
            this.components.map.render();
            console.log('✅ Map rendered');
        }
        
        // Calendar renders itself via initCalendar()
        
        // Render orders
        if (this.components.orders && typeof this.components.orders.render === 'function') {
            this.components.orders.render();
            console.log('✅ Orders rendered');
        }
    }

    setupComponentInteractions() {
        console.log('🔗 CarvoDashboard: Setting up component interactions...');
        


        // Date filter
        const dateFilter = document.querySelector('.filter-select');
        if (dateFilter) {
            dateFilter.addEventListener('change', (e) => {
                if (this.components.statistics) {
                    this.components.statistics.updateDateRange(e.target.value);
                }
            });
        }

        // Map controls
        const zoomInBtn = document.getElementById('zoom-in');
        const zoomOutBtn = document.getElementById('zoom-out');
        
        if (zoomInBtn && this.components.map) {
            zoomInBtn.addEventListener('click', () => {
                this.components.map.zoomIn();
            });
        }
        
        if (zoomOutBtn && this.components.map) {
            zoomOutBtn.addEventListener('click', () => {
                this.components.map.zoomOut();
            });
        }

        // Map section reference for height syncing
        const mapSection = document.querySelector('.map-section');
        const dashboardLayout = document.querySelector('.dashboard-layout');

        const syncMapHeightToStats = () => {
            const statsGrid = document.querySelector('.stats-grid');
            const mapContainer = mapSection ? mapSection.querySelector('.map-container') : null;
            if (statsGrid && mapContainer) {
                const statsHeight = statsGrid.getBoundingClientRect().height;
                mapContainer.style.height = `${statsHeight}px`;
                if (this.components.map && this.components.map.map) {
                    setTimeout(() => this.components.map.map.invalidateSize(), 0);
                }
            }
        };

        if (mapSection && dashboardLayout) {
            // initial sync
            setTimeout(syncMapHeightToStats, 0);
        }

        // Map size presets
        const sizeButtons = document.querySelectorAll('.size-btn');
        if (sizeButtons.length && dashboardLayout) {
            const applySize = (size) => {
                let percent;
                if (size === 'small') percent = 30;
                else if (size === 'large') percent = 50;
                else percent = 40;
                dashboardLayout.style.gridTemplateColumns = `1fr ${percent}%`;
                if (this.components.map && this.components.map.map) {
                    setTimeout(() => this.components.map.map.invalidateSize(), 0);
                }
            };

            sizeButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    sizeButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    applySize(btn.dataset.size);
                    setTimeout(syncMapHeightToStats, 0);
                });
            });
        }

        // Sync on window resize as well
        window.addEventListener('resize', () => setTimeout(syncMapHeightToStats, 0));
    }

    // Initialize FullCalendar in place of the old schedule component
    initCalendar() {
        const calendarEl = document.getElementById('calendar');
        if (!calendarEl) {
            console.error('❌ Calendar element not found');
            return;
        }
        
        if (typeof FullCalendar === 'undefined') {
            console.error('❌ FullCalendar library not loaded');
            return;
        }

        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'listWeek',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            height: 'auto',
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            weekends: true,
            events: [
                { 
                    title: 'Vehicle Pickup - Order #1245', 
                    start: '2025-08-27',
                    color: '#10B981',
                    extendedProps: { 
                        type: 'pickup',
                        customer: 'Chris Evan',
                        vehicle: 'Toyota Avanza',
                        orderId: '1245'
                    }
                },
                { 
                    title: 'Maintenance - Van 12', 
                    start: '2025-08-28',
                    color: '#F59E0B',
                    extendedProps: { 
                        type: 'maintenance',
                        vehicle: 'Van 12',
                        description: 'Regular maintenance check'
                    }
                },
                { 
                    title: 'Customer Delivery - Order #1246', 
                    start: '2025-08-29',
                    color: '#3B82F6',
                    extendedProps: { 
                        type: 'delivery',
                        customer: 'Chris Hemsworth',
                        vehicle: 'Daihatsu Xenia',
                        orderId: '1246'
                    }
                },
                { 
                    title: 'Vehicle Return - Order #1247', 
                    start: '2025-08-30',
                    color: '#8B5CF6',
                    extendedProps: { 
                        type: 'return',
                        customer: 'Achmad Wahono',
                        vehicle: 'Honda Civic',
                        orderId: '1247'
                    }
                },
                { 
                    title: 'New Rental - Order #1248', 
                    start: '2025-08-31',
                    color: '#EF4444',
                    extendedProps: { 
                        type: 'rental',
                        customer: 'Wirman Mustafa',
                        vehicle: 'Nissan X-Trail',
                        orderId: '1248'
                    }
                }
            ],
            select: function(arg) {
                // Handle date selection
                console.log('Date selected:', arg.startStr);
                // You could open a modal to create a new event here
            },
            eventClick: function(arg) {
                // Handle event click
                console.log('Event clicked:', arg.event.title);
                // You could open a modal with event details here
            },
            eventDrop: function(arg) {
                // Handle event drag and drop
                console.log('Event moved:', arg.event.title, 'to', arg.event.startStr);
            },
            eventResize: function(arg) {
                // Handle event resize
                console.log('Event resized:', arg.event.title);
            }
        });
        calendar.render();
        this.calendar = calendar;
        console.log('✅ Calendar initialized successfully');
        console.log('📅 Calendar element:', calendarEl);
        console.log('📅 Calendar instance:', calendar);
    }



    setupGlobalEventListeners() {
        console.log('🎧 CarvoDashboard: Setting up global event listeners...');
        
        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
        
        // Window resize
        window.addEventListener('resize', this.handleWindowResize.bind(this));
        
        // Refresh button
        const refreshBtn = document.querySelector('.btn-refresh');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshData();
            });
        }
        
        // Map size controls
        const sizeBtns = document.querySelectorAll('.size-btn');
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.handleMapSizeChange(btn.dataset.size);
            });
        });
        
        // Tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.handleTabChange(btn.textContent.trim());
            });
        });
        
        // Modal close events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || 
                e.target.closest('.modal-close')) {
                this.closeModals();
            }
        });
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            console.log('🔍 Search shortcut triggered');
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            this.closeModals();
        }
    }

    handleWindowResize() {
        // Re-render components on window resize
        if (this.components.map) {
            this.components.map.handleResize();
        }
    }

    closeModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('show');
        });
    }

    refreshData() {
        console.log('🔄 Refreshing dashboard data...');
        
        // Show loading state
        const refreshBtn = document.querySelector('.btn-refresh');
        if (refreshBtn) {
            const originalText = refreshBtn.innerHTML;
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            refreshBtn.disabled = true;
            
            // Simulate refresh delay
            setTimeout(() => {
                // Refresh all components
                if (this.components.statistics) {
                    this.components.statistics.renderStatistics();
                }
                if (this.components.orders) {
                    this.components.orders.renderOrders();
                }
                if (this.components.map) {
                    this.components.map.refreshMarkers();
                }
                
                // Restore button
                refreshBtn.innerHTML = originalText;
                refreshBtn.disabled = false;
                
                console.log('✅ Dashboard data refreshed');
            }, 1000);
        }
    }

    handleMapSizeChange(size) {
        console.log('🗺️ Changing map size to:', size);
        
        const mapContainer = document.querySelector('.map-container');
        if (!mapContainer) return;
        
        const sizes = {
            small: '300px',
            medium: '400px',
            large: '500px'
        };
        
        mapContainer.style.height = sizes[size] || '400px';
        
        // Trigger map resize
        if (this.components.map && this.components.map.map) {
            this.components.map.map.invalidateSize();
        }
    }

    handleTabChange(tabName) {
        console.log('📋 Switching to tab:', tabName);
        
        // Update orders component with new tab
        if (this.components.orders) {
            this.components.orders.setCurrentTab(tabName.toLowerCase());
            this.components.orders.renderOrders();
        }
    }

    startRealTimeUpdates() {
        console.log('⏰ CarvoDashboard: Starting real-time updates...');
        
        // Update statistics every 30 seconds
        setInterval(() => {
            if (this.components.statistics) {
                this.components.statistics.updateStatistics();
            }
        }, 30000);

        // Update map every 10 seconds
        setInterval(() => {
            if (this.components.map) {
                this.components.map.updateVehicleLocations();
            }
        }, 10000);

        // Update orders tab counts every 15 seconds
        setInterval(() => {
            if (this.components.orders) {
                this.components.orders.updateTabCounts();
            }
        }, 15000);
    }

    // Public API methods
    getStatistics() {
        return this.components.statistics ? this.components.statistics.statsData : null;
    }

    getMap() {
        return this.components.map ? this.components.map.map : null;
    }

    getSchedule() {
        return this.components.schedule ? this.components.schedule : null;
    }

    getOrders() {
        return this.components.orders ? this.components.orders : null;
    }

    // Force re-render all components
    async refresh() {
        console.log('🔄 CarvoDashboard: Refreshing all components...');
        await this.renderAllComponents();
    }

    // Destroy dashboard and clean up
    destroy() {
        console.log('🧹 CarvoDashboard: Cleaning up...');
        
        // Clean up components
        Object.values(this.components).forEach(component => {
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
        });

        // Remove event listeners
        document.removeEventListener('keydown', this.handleKeyboardShortcuts);
        window.removeEventListener('resize', this.handleWindowResize);
        
        this.isInitialized = false;
    }
}

// Initialize dashboard when DOM is loaded
let dashboard;

// Wait for DOM and libraries to be ready
async function initializeDashboard() {
    try {
        console.log('🌐 Starting dashboard initialization...');
        dashboard = new CarvoDashboard();
        window.carvoDashboard = dashboard;
        
        console.log('🎉 Dashboard initialization complete!');
        
    } catch (error) {
        console.error('💥 Dashboard initialization failed:', error);
    }
}



// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
    initializeDashboard();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CarvoDashboard;
}
