class MapComponent {
    constructor() {
        this.map = null;
        this.markers = [];
        this.vehicles = [];
        this.init().catch(error => {
            console.error('❌ MapComponent: Initialization failed:', error);
        });
    }

    async init() {
        await this.loadVehicleData();
        this.initializeMap();
        this.setupEventListeners();
    }

    async loadVehicleData() {
        // Load vehicle data with 6 specific cars in use
        this.vehicles = [
            {
                id: 1,
                model: 'Toyota Avalon V6',
                licensePlate: 'B 3243 ABC',
                status: 'In use',
                location: { lat: 40.7128, lng: -74.0060 },
                image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop&crop=center',
                placeholderIcon: 'fas fa-car',
                customer: 'Chris Evan',
                phone: '081273832821',
                rentDueDate: '24 Jun 2024',
                brand: 'toyota'
            },
            {
                id: 2,
                model: 'Honda Civic 1.8 E C/T',
                licensePlate: 'B 1234 DEF',
                status: 'In use',
                location: { lat: 40.7589, lng: -73.9851 },
                image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop&crop=center',
                placeholderIcon: 'fas fa-car',
                customer: 'Sarah Johnson',
                phone: '081234567890',
                rentDueDate: '28 Jun 2024',
                brand: 'honda'
            },
            {
                id: 3,
                model: 'Toyota Rav4',
                licensePlate: 'B 5678 GHI',
                status: 'In use',
                location: { lat: 40.7505, lng: -73.9934 },
                image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop&crop=center',
                placeholderIcon: 'fas fa-car',
                customer: 'Michael Chen',
                phone: '081345678901',
                rentDueDate: '30 Jun 2024',
                brand: 'toyota'
            },
            {
                id: 4,
                model: 'Lexus ES 350',
                licensePlate: 'B 9012 JKL',
                status: 'In use',
                location: { lat: 40.7829, lng: -73.9654 },
                image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop&crop=center',
                placeholderIcon: 'fas fa-car',
                customer: 'Emily Davis',
                phone: '081456789012',
                rentDueDate: '02 Jul 2024',
                brand: 'lexus'
            },
            {
                id: 5,
                model: 'Nissan X-Trail 2.5 CVT',
                licensePlate: 'B 3456 MNO',
                status: 'In use',
                location: { lat: 40.7549, lng: -73.9840 },
                image: 'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=400&h=250&fit=crop&crop=center',
                placeholderIcon: 'fas fa-car',
                customer: 'David Wilson',
                phone: '081567890123',
                rentDueDate: '05 Jul 2024',
                brand: 'nissan'
            },
            {
                id: 6,
                model: 'Acura RDX',
                licensePlate: 'B 7890 PQR',
                status: 'In use',
                location: { lat: 40.7614, lng: -73.9776 },
                image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=250&fit=crop&crop=center',
                placeholderIcon: 'fas fa-car',
                customer: 'Lisa Anderson',
                phone: '081678901234',
                rentDueDate: '08 Jul 2024',
                brand: 'acura'
            }
        ];
    }



    initializeMap() {
        // Check if Leaflet is available
        if (typeof L === 'undefined') {
            console.error('❌ MapComponent: Leaflet library not loaded');
            return;
        }

        // Check if map element exists
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('❌ MapComponent: Map element not found');
            return;
        }

        try {
            // Initialize Leaflet map
            this.map = L.map('map').setView([40.7128, -74.0060], 13);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.map);

            // Add vehicle markers
            this.addVehicleMarkers();

            // Setup map controls
            this.setupMapControls();
            
            console.log('✅ MapComponent: Map initialized successfully');
        } catch (error) {
            console.error('❌ MapComponent: Failed to initialize map:', error);
        }
    }

    addVehicleMarkers() {
        this.vehicles.forEach(vehicle => {
            const marker = this.createCarMarker(vehicle);
            this.markers.push(marker);
        });
    }

    createCarMarker(vehicle) {
        // Create custom car marker
        const carIcon = L.divIcon({
            className: 'car-marker',
            html: `<i class="fas fa-car"></i>`,
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -24]
        });

        const marker = L.marker([vehicle.location.lat, vehicle.location.lng], {
            icon: carIcon
        }).addTo(this.map);

        // Add status class to marker
        const iconElement = marker.getElement();
        if (iconElement) {
            iconElement.classList.add(vehicle.status.toLowerCase().replace(' ', '-'));
        }

        // Bind popup
        marker.bindPopup(this.createVehiclePopup(vehicle));

        // Add click event
        marker.on('click', () => {
            this.handleVehicleClick(vehicle);
        });

        return marker;
    }

    createVehiclePopup(vehicle) {
        const statusColor = this.getStatusColor(vehicle.status);
        
        return `
            <div class="vehicle-popup">
                <div class="vehicle-popup-image">
                    <img src="${vehicle.image}" alt="${vehicle.model}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="vehicle-placeholder" style="display: none;">
                        <i class="${vehicle.placeholderIcon}"></i>
                    </div>
                </div>
                <div class="vehicle-popup-info">
                    <h4>${vehicle.model}</h4>
                    <p>${vehicle.licensePlate}</p>
                    <div class="vehicle-status">
                        <span class="status-indicator" style="background: ${statusColor};"></span>
                        <span class="status-text">${vehicle.status}</span>
                    </div>
                    ${vehicle.customer ? `
                        <div class="vehicle-details">
                            <div class="vehicle-detail-row">
                                <span class="detail-label">Driver:</span>
                                <span class="detail-value">${vehicle.customer}</span>
                            </div>
                            <div class="vehicle-detail-row">
                                <span class="detail-label">Phone:</span>
                                <span class="detail-value">${vehicle.phone}</span>
                            </div>
                            <div class="vehicle-detail-row">
                                <span class="detail-label">Due Date:</span>
                                <span class="detail-value">${vehicle.rentDueDate}</span>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getStatusColor(status) {
        switch (status) {
            case 'In use':
                return '#3B82F6';
            case 'Available':
                return '#10B981';
            case 'Maintenance':
                return '#F59E0B';
            default:
                return '#6B7280';
        }
    }

    handleVehicleClick(vehicle) {
        // Handle vehicle click - could open detailed modal
        console.log('Vehicle clicked:', vehicle);
        
        // You could emit an event or call a callback here
        if (this.onVehicleClick) {
            this.onVehicleClick(vehicle);
        }
    }

    refreshMarkers() {
        console.log('🔄 Refreshing map markers...');
        
        // Clear existing markers
        this.markers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.markers = [];
        
        // Reload vehicle data
        this.loadVehicleData();
        
        // Add new markers
        this.addVehicleMarkers();
        
        console.log('✅ Map markers refreshed');
    }

    setupMapControls() {
        // Zoom controls
        const zoomInBtn = document.getElementById('zoom-in');
        const zoomOutBtn = document.getElementById('zoom-out');

        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                this.map.zoomIn();
            });
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                this.map.zoomOut();
            });
        }
    }

    setupEventListeners() {
        // Map-specific event listeners
        this.map.on('zoomend', () => {
            this.updateMarkerVisibility();
        });

        this.map.on('moveend', () => {
            this.updateMarkerVisibility();
        });
    }

    updateMarkerVisibility() {
        // Update marker visibility based on zoom level
        const zoom = this.map.getZoom();
        
        this.markers.forEach(marker => {
            const iconElement = marker.getElement();
            if (iconElement) {
                if (zoom < 12) {
                    iconElement.style.opacity = '0.7';
                } else {
                    iconElement.style.opacity = '1';
                }
            }
        });
    }

    // Focus on specific vehicle
    focusVehicle(vehicleId) {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (vehicle) {
            this.map.setView([vehicle.location.lat, vehicle.location.lng], 15);
            
            // Find and open marker popup
            this.markers.forEach(marker => {
                const markerLatLng = marker.getLatLng();
                if (markerLatLng.lat === vehicle.location.lat && markerLatLng.lng === vehicle.location.lng) {
                    marker.openPopup();
                }
            });
        }
    }

    // Update vehicle locations in real-time
    updateVehicleLocations() {
        this.vehicles.forEach((vehicle, index) => {
            if (vehicle.status === 'In use') {
                // Simulate movement by adding small random changes
                const latChange = (Math.random() - 0.5) * 0.001;
                const lngChange = (Math.random() - 0.5) * 0.001;
                
                vehicle.location.lat += latChange;
                vehicle.location.lng += lngChange;
                
                // Update marker position
                if (this.markers[index]) {
                    this.markers[index].setLatLng([vehicle.location.lat, vehicle.location.lng]);
                    
                    // Update popup content with new location
                    this.markers[index].getPopup().setContent(this.createVehiclePopup(vehicle));
                }
            }
        });
    }

    // Filter vehicles by status
    filterVehicles(status) {
        this.markers.forEach((marker, index) => {
            const vehicle = this.vehicles[index];
            if (status === 'all' || vehicle.status === status) {
                marker.addTo(this.map);
            } else {
                marker.remove();
            }
        });
    }

    // Get vehicle by ID
    getVehicleById(id) {
        return this.vehicles.find(vehicle => vehicle.id === id);
    }

    // Start real-time updates
    startRealTimeUpdates() {
        setInterval(() => {
            this.updateVehicleLocations();
        }, 5000); // Update every 5 seconds
    }

    // Public render method
    render() {
        console.log('🗺️ MapComponent: Rendering map...');
        if (this.map) {
            this.map.invalidateSize();
        }
    }

    // Zoom controls
    zoomIn() {
        if (this.map) {
            this.map.zoomIn();
        }
    }

    zoomOut() {
        if (this.map) {
            this.map.zoomOut();
        }
    }

    // Handle window resize
    handleResize() {
        if (this.map) {
            setTimeout(() => {
                this.map.invalidateSize();
            }, 100);
        }
    }

    // Destroy map
    destroy() {
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
        this.markers = [];
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MapComponent;
} else {
    window.MapComponent = MapComponent;
}
