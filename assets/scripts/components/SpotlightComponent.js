class SpotlightComponent {
    constructor() {
        this.overlay = document.getElementById('spotlight-overlay');
        this.input = document.getElementById('spotlight-input');
        this.results = document.getElementById('spotlight-results');
        this.trigger = document.getElementById('spotlight-trigger');
        this.closeBtn = document.getElementById('spotlight-close');
        this.orderPopup = document.getElementById('order-popup');
        this.orderPopupContent = document.getElementById('order-popup-content');
        this.orderPopupClose = document.getElementById('order-popup-close');
        
        this.searchData = [];
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadSearchData();
    }
    
    bindEvents() {
        // Spotlight trigger
        this.trigger.addEventListener('click', () => this.open());
        
        // Close spotlight
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.open();
            }
        });
        
        // Search input
        this.input.addEventListener('input', () => this.performSearch());
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const firstResult = this.results.querySelector('.spotlight-result');
                if (firstResult) {
                    firstResult.click();
                }
            }
        });
        
        // Order popup close
        this.orderPopupClose.addEventListener('click', () => this.closeOrderPopup());
        this.orderPopup.addEventListener('click', (e) => {
            if (e.target === this.orderPopup) this.closeOrderPopup();
        });
    }
    
    loadSearchData() {
        // Mock data - in real app this would come from your orders/vehicles/customers
        this.searchData = [
            {
                id: '23827324',
                type: 'order',
                title: 'Order #23827324',
                subtitle: 'Honda Civic 1.8 E C/T',
                meta: 'Wirman Mustafa • Active',
                icon: 'fas fa-list',
                data: {
                    orderId: '23827324',
                    vehicle: 'Honda Civic 1.8 E C/T',
                    plate: 'B 4567 KLM',
                    status: 'Active',
                    customer: 'Wirman Mustafa',
                    phone: '081345678901',
                    dueDate: 'Jun 24, 2024',
                    vehicleImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=200&fit=crop'
                }
            },
            {
                id: '23827326',
                type: 'order',
                title: 'Order #23827326',
                subtitle: 'Toyota Camry 2.0 G',
                meta: 'Sarah Johnson • Active',
                icon: 'fas fa-list',
                data: {
                    orderId: '23827326',
                    vehicle: 'Toyota Camry 2.0 G',
                    plate: 'B 5678 QRS',
                    status: 'Active',
                    customer: 'Sarah Johnson',
                    phone: '081567890123',
                    dueDate: 'Jun 26, 2024',
                    vehicleImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=200&fit=crop'
                }
            },
            {
                id: '22927224',
                type: 'order',
                title: 'Order #22927224',
                subtitle: 'BMW X3 xDrive30i',
                meta: 'Michael Chen • Pending',
                icon: 'fas fa-list',
                data: {
                    orderId: '22927224',
                    vehicle: 'BMW X3 xDrive30i',
                    plate: 'B 7890 TUV',
                    status: 'Pending',
                    customer: 'Michael Chen',
                    phone: '081789012345',
                    dueDate: 'Jun 28, 2024',
                    vehicleImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=200&fit=crop'
                }
            },
            {
                id: 'honda-civic',
                type: 'vehicle',
                title: 'Honda Civic 1.8 E C/T',
                subtitle: 'B 4567 KLM',
                meta: 'Available • Sedan',
                icon: 'fas fa-car',
                data: {
                    model: 'Honda Civic 1.8 E C/T',
                    plate: 'B 4567 KLM',
                    type: 'Sedan',
                    status: 'Available',
                    year: '2023',
                    mileage: '15,000 km'
                }
            },
            {
                id: 'toyota-camry',
                type: 'vehicle',
                title: 'Toyota Camry 2.0 G',
                subtitle: 'B 5678 QRS',
                meta: 'In Use • Sedan',
                icon: 'fas fa-car',
                data: {
                    model: 'Toyota Camry 2.0 G',
                    plate: 'B 5678 QRS',
                    type: 'Sedan',
                    status: 'In Use',
                    year: '2023',
                    mileage: '12,500 km'
                }
            },
            {
                id: 'wirman-mustafa',
                type: 'customer',
                title: 'Wirman Mustafa',
                subtitle: '081345678901',
                meta: 'Active Customer • 5 orders',
                icon: 'fas fa-user',
                data: {
                    name: 'Wirman Mustafa',
                    phone: '081345678901',
                    email: 'wirman@example.com',
                    totalOrders: 5,
                    status: 'Active'
                }
            },
            {
                id: 'sarah-johnson',
                type: 'customer',
                title: 'Sarah Johnson',
                subtitle: '081567890123',
                meta: 'Active Customer • 3 orders',
                icon: 'fas fa-user',
                data: {
                    name: 'Sarah Johnson',
                    phone: '081567890123',
                    email: 'sarah@example.com',
                    totalOrders: 3,
                    status: 'Active'
                }
            }
        ];
    }
    
    open() {
        this.isOpen = true;
        this.overlay.classList.add('active');
        this.input.focus();
        this.input.select();
        
        // Show all results initially
        this.performSearch();
    }
    
    close() {
        this.isOpen = false;
        this.overlay.classList.remove('active');
        this.input.value = '';
        this.results.innerHTML = '';
    }
    
    performSearch() {
        const query = this.input.value.toLowerCase().trim();
        
        if (!query) {
            this.showAllResults();
            return;
        }
        
        const filteredResults = this.searchData.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.subtitle.toLowerCase().includes(query) ||
            item.meta.toLowerCase().includes(query)
        );
        
        this.displayResults(filteredResults);
    }
    
    showAllResults() {
        this.displayResults(this.searchData);
    }
    
    displayResults(results) {
        this.results.innerHTML = '';
        
        if (results.length === 0) {
            this.results.innerHTML = `
                <div class="spotlight-result">
                    <div class="result-content">
                        <div class="result-title">No results found</div>
                        <div class="result-subtitle">Try a different search term</div>
                    </div>
                </div>
            `;
            return;
        }
        
        results.forEach(item => {
            const resultElement = document.createElement('div');
            resultElement.className = 'spotlight-result';
            resultElement.innerHTML = `
                <div class="result-icon">
                    <i class="${item.icon}"></i>
                </div>
                <div class="result-content">
                    <div class="result-title">${item.title}</div>
                    <div class="result-subtitle">${item.subtitle}</div>
                    <div class="result-meta">${item.meta}</div>
                </div>
                <div class="result-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            `;
            
            resultElement.addEventListener('click', () => this.handleResultClick(item));
            this.results.appendChild(resultElement);
        });
    }
    
    handleResultClick(item) {
        if (item.type === 'order') {
            this.showOrderDetails(item.data);
        } else if (item.type === 'vehicle') {
            this.showVehicleDetails(item.data);
        } else if (item.type === 'customer') {
            this.showCustomerDetails(item.data);
        }
        
        this.close();
    }
    
    showOrderDetails(orderData) {
        this.orderPopupContent.innerHTML = `
            <div class="order-detail-section">
                <div class="detail-section-title">Order Information</div>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Order ID</div>
                        <div class="detail-value">${orderData.orderId}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Status</div>
                        <div class="detail-value status-${orderData.status.toLowerCase()}">${orderData.status}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Due Date</div>
                        <div class="detail-value">${orderData.dueDate}</div>
                    </div>
                </div>
            </div>
            
            <div class="order-detail-section">
                <div class="detail-section-title">Vehicle</div>
                <div class="order-vehicle-detail">
                    <div class="vehicle-image">
                        <img src="${orderData.vehicleImage}" alt="${orderData.vehicle}">
                    </div>
                    <div class="vehicle-info">
                        <div class="vehicle-model">${orderData.vehicle}</div>
                        <div class="vehicle-plate">${orderData.plate}</div>
                    </div>
                </div>
            </div>
            
            <div class="order-detail-section">
                <div class="detail-section-title">Customer</div>
                <div class="customer-detail">
                    <div class="customer-avatar">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="${orderData.customer}">
                    </div>
                    <div class="customer-info">
                        <div class="customer-name">${orderData.customer}</div>
                        <div class="customer-phone">${orderData.phone}</div>
                    </div>
                </div>
            </div>
        `;
        
        this.orderPopup.classList.add('active');
    }
    
    showVehicleDetails(vehicleData) {
        this.orderPopupContent.innerHTML = `
            <div class="order-detail-section">
                <div class="detail-section-title">Vehicle Information</div>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Model</div>
                        <div class="detail-value">${vehicleData.model}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">License Plate</div>
                        <div class="detail-value">${vehicleData.plate}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Type</div>
                        <div class="detail-value">${vehicleData.type}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Status</div>
                        <div class="detail-value status-${vehicleData.status.toLowerCase().replace(' ', '-')}">${vehicleData.status}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Year</div>
                        <div class="detail-value">${vehicleData.year}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Mileage</div>
                        <div class="detail-value">${vehicleData.mileage}</div>
                    </div>
                </div>
            </div>
        `;
        
        this.orderPopup.classList.add('active');
    }
    
    showCustomerDetails(customerData) {
        this.orderPopupContent.innerHTML = `
            <div class="order-detail-section">
                <div class="detail-section-title">Customer Information</div>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Name</div>
                        <div class="detail-value">${customerData.name}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Phone</div>
                        <div class="detail-value">${customerData.phone}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Email</div>
                        <div class="detail-value">${customerData.email}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Total Orders</div>
                        <div class="detail-value">${customerData.totalOrders}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Status</div>
                        <div class="detail-value status-${customerData.status.toLowerCase()}">${customerData.status}</div>
                    </div>
                </div>
            </div>
        `;
        
        this.orderPopup.classList.add('active');
    }
    
    closeOrderPopup() {
        this.orderPopup.classList.remove('active');
    }
}

// Export for use in other files
window.SpotlightComponent = SpotlightComponent;
