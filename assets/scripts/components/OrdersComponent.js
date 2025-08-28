class OrdersComponent {
    constructor() {
        this.orders = [];
        this.currentTab = 'ongoing';
        this.init().catch(error => {
            console.error('❌ OrdersComponent: Initialization failed:', error);
        });
    }

    async init() {
        await this.loadOrders();
        this.setupEventListeners();
        this.renderOrders();
    }

    async loadOrders() {
        // Initialize Pixabay service if available
        if (window.PixabayService) {
            this.pixabayService = new PixabayService();
        }

        // Load comprehensive orders data
        this.orders = [
            {
                id: '23827322',
                vehicleId: 1,
                customerId: 1,
                status: 'In use',
                startDate: '2024-06-20',
                endDate: '2024-06-24',
                totalAmount: 450,
                daysLeft: 2,
                vehicle: {
                    model: 'Toyota Avalon V6',
                    licensePlate: 'B 3243 ABC',
                    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=200&fit=crop&crop=center'
                },
                customer: {
                    name: 'Chris Evan',
                    phone: '081273832821',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
                }
            },
            {
                id: '23827324',
                vehicleId: 2,
                customerId: 2,
                status: 'In use',
                startDate: '2024-06-20',
                endDate: '2024-06-25',
                totalAmount: 520,
                daysLeft: 3,
                vehicle: {
                    model: 'Honda Civic 1.8 E C/T',
                    licensePlate: 'B 1234 DEF',
                    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop&crop=center'
                },
                customer: {
                    name: 'Sarah Johnson',
                    phone: '081234567890',
                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
                }
            },
            {
                id: '23827326',
                vehicleId: 3,
                customerId: 3,
                status: 'In use',
                startDate: '2024-06-22',
                endDate: '2024-06-27',
                totalAmount: 580,
                daysLeft: 5,
                vehicle: {
                    model: 'Toyota Rav4',
                    licensePlate: 'B 5678 GHI',
                    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop&crop=center'
                },
                customer: {
                    name: 'Michael Chen',
                    phone: '081345678901',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
                }
            },
            {
                id: '23827325',
                vehicleId: 4,
                customerId: 4,
                status: 'In use',
                startDate: '2024-07-01',
                endDate: '2024-07-05',
                totalAmount: 650,
                daysLeft: 7,
                vehicle: {
                    model: 'Lexus ES 350',
                    licensePlate: 'B 9012 JKL',
                    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop&crop=center'
                },
                customer: {
                    name: 'Emily Davis',
                    phone: '081456789012',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
                }
            },
            {
                id: '23827327',
                vehicleId: 5,
                customerId: 5,
                status: 'In use',
                startDate: '2024-06-24',
                endDate: '2024-06-29',
                totalAmount: 720,
                daysLeft: 2,
                vehicle: {
                    model: 'Nissan X-Trail 2.5 CVT',
                    licensePlate: 'B 3456 MNO',
                    image: 'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=300&h=200&fit=crop&crop=center'
                },
                customer: {
                    name: 'David Wilson',
                    phone: '081567890123',
                    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
                }
            },
            {
                id: '23827328',
                vehicleId: 6,
                customerId: 6,
                status: 'In use',
                startDate: '2024-06-25',
                endDate: '2024-06-30',
                totalAmount: 800,
                daysLeft: 1,
                vehicle: {
                    model: 'Acura RDX',
                    licensePlate: 'B 7890 PQR',
                    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300&h=200&fit=crop&crop=center'
                },
                customer: {
                    name: 'Lisa Anderson',
                    phone: '081678901234',
                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
                }
            }
        ];

        // Update tab counts
        this.updateTabCounts();

        // Update images with Pixabay if service is available
        if (this.pixabayService) {
            await this.updateOrderImages();
        }
    }

    async updateOrderImages() {
        try {
            // Get customer avatars
            const avatarImages = await this.pixabayService.getCustomerAvatars();
            
            // Update customer avatars
            for (let order of this.orders) {
                if (order.customer && avatarImages.length > 0) {
                    const randomAvatar = this.pixabayService.getRandomImage(avatarImages);
                    order.customer.avatar = randomAvatar.webformatURL;
                }
                
                // Update vehicle images
                if (order.vehicle && order.vehicle.model) {
                    const brand = this.extractBrandFromModel(order.vehicle.model);
                    if (brand) {
                        const vehicleImages = await this.pixabayService.getCarBrandImages(brand);
                        if (vehicleImages && vehicleImages.length > 0) {
                            const randomVehicle = this.pixabayService.getRandomImage(vehicleImages);
                            order.vehicle.image = randomVehicle.webformatURL;
                        }
                    }
                }
            }
            console.log('✅ Order images updated with Pixabay');
        } catch (error) {
            console.warn('⚠️ Failed to update order images:', error);
        }
    }

    extractBrandFromModel(model) {
        const modelLower = model.toLowerCase();
        if (modelLower.includes('toyota')) return 'toyota';
        if (modelLower.includes('honda')) return 'honda';
        if (modelLower.includes('bmw')) return 'bmw';
        if (modelLower.includes('nissan')) return 'nissan';
        if (modelLower.includes('daihatsu')) return 'daihatsu';
        return null;
    }

    setupEventListeners() {
        // Tab switching
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleTabClick(e);
            });
        });
    }

    handleTabClick(e) {
        // Find the actual button element (in case we clicked on a child element)
        const button = e.target.closest('.tab-btn');
        if (!button) return;
        
        const tabText = button.textContent.trim().toLowerCase();
        let tabType = 'ongoing';
        
        if (tabText.includes('ongoing')) {
            tabType = 'ongoing';
        } else if (tabText.includes('next 5 days')) {
            tabType = 'upcoming';
        } else if (tabText.includes('completed')) {
            tabType = 'completed';
        }
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        this.currentTab = tabType;
        this.renderOrders();
        
        console.log('📋 OrdersComponent: Tab clicked -', tabType, 'orders:', this.getFilteredOrders().length);
    }

    renderOrders() {
        const ordersList = document.querySelector('.orders-list');
        if (!ordersList) {
            console.error('❌ OrdersComponent: Could not find .orders-list element');
            return;
        }

        try {
            ordersList.innerHTML = '';

            const filteredOrders = this.getFilteredOrders();

            if (filteredOrders.length === 0) {
                ordersList.innerHTML = `
                    <div class="no-orders">
                        <i class="fas fa-clipboard-list"></i>
                        <p>No ${this.currentTab} orders found</p>
                    </div>
                `;
                return;
            }

            filteredOrders.forEach(order => {
                const orderElement = this.createOrderElement(order);
                ordersList.appendChild(orderElement);
            });
            
            console.log('✅ OrdersComponent: Rendered', filteredOrders.length, 'orders');
        } catch (error) {
            console.error('❌ OrdersComponent: Failed to render orders:', error);
        }
    }

    getFilteredOrders() {
        switch (this.currentTab) {
            case 'ongoing':
                return this.orders.filter(order => order.status === 'Active' || order.status === 'In use');
            case 'upcoming':
                const fiveDaysFromNow = new Date();
                fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);
                return this.orders.filter(order => {
                    const orderDate = new Date(order.startDate);
                    const today = new Date();
                    return orderDate > today && 
                           orderDate <= fiveDaysFromNow && 
                           order.status !== 'Completed';
                });
            case 'completed':
                return this.orders.filter(order => order.status === 'Completed');
            default:
                return this.orders;
        }
    }

    setCurrentTab(tabName) {
        this.currentTab = tabName;
        console.log('📋 OrdersComponent: Tab changed to:', tabName);
    }

    render() {
        this.setupEventListeners();
        this.renderOrders();
        this.updateTabCounts();
        console.log('✅ OrdersComponent: Rendered successfully');
    }

    createOrderElement(order) {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-item';
        orderElement.dataset.orderId = order.id;
        
        orderElement.innerHTML = `
            <div class="order-vehicle">
                <div class="order-id">${order.id}</div>
                <div class="order-model">${order.vehicle.model}</div>
                <div class="order-plate">${order.vehicle.licensePlate}</div>
                <div class="order-status-badge ${order.status.toLowerCase().replace(' ', '-')}">${order.status}</div>
            </div>
            <div class="order-customer">
                <div class="customer-avatar">
                    <img src="${order.customer.avatar || 'https://via.placeholder.com/40x40/6B7280/FFFFFF?text=' + order.customer.name.charAt(0)}" alt="${order.customer.name}">
                </div>
                <div class="customer-info">
                    <div class="customer-name">${order.customer.name}</div>
                    <div class="customer-phone">${order.customer.phone}</div>
                    <div class="rent-due-date">Rent due date: ${new Date(order.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                </div>
            </div>
        `;

        // Add click event for order details
        orderElement.addEventListener('click', () => {
            this.showOrderDetails(order);
        });

        return orderElement;
    }

    showOrderDetails(order) {
        // Use the global spotlight component to show order details
        if (window.carvoDashboard && window.carvoDashboard.components.spotlight) {
            const orderData = {
                orderId: order.id,
                vehicle: order.vehicle.model,
                plate: order.vehicle.licensePlate,
                status: order.status,
                customer: order.customer.name,
                phone: order.customer.phone,
                dueDate: new Date(order.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
                vehicleImage: order.vehicle.image
            };
            
            window.carvoDashboard.components.spotlight.showOrderDetails(orderData);
        }
    }

    // Get orders count by status
    getOrdersCount() {
        const ongoing = this.orders.filter(order => order.status === 'Active' || order.status === 'In use').length;
        const upcoming = this.orders.filter(order => {
            const orderDate = new Date(order.startDate);
            const today = new Date();
            const fiveDaysFromNow = new Date();
            fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);
            return orderDate > today && orderDate <= fiveDaysFromNow && order.status !== 'Completed';
        }).length;

        return { ongoing, upcoming };
    }

    updateTabCounts() {
        const counts = this.getOrdersCount();
        
        const ongoingTab = document.querySelector('.tab-btn:first-child');
        const upcomingTab = document.querySelector('.tab-btn:last-child');
        
        if (ongoingTab) {
            const countElement = ongoingTab.querySelector('.tab-count');
            if (countElement) {
                countElement.textContent = counts.ongoing;
            }
        }
        
        if (upcomingTab) {
            const countElement = upcomingTab.querySelector('.tab-count');
            if (countElement) {
                countElement.textContent = counts.upcoming;
            }
        }
        
        console.log('📊 OrdersComponent: Tab counts updated - Ongoing:', counts.ongoing, 'Upcoming:', counts.upcoming);
    }

    getOrderById(id) {
        return this.orders.find(order => order.id === id);
    }
}

// Make it globally available
window.OrdersComponent = OrdersComponent;
