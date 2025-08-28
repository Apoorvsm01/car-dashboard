class StatisticsComponent {
    constructor() {
        this.statsData = null;
        this.currentLayout = 'grid';
        this.init();
    }

    init() {
        console.log('StatisticsComponent: Initializing...');
        this.loadStatistics();
        this.setupEventListeners();
        console.log('StatisticsComponent: Initialized with', Object.keys(this.statsData).length, 'statistics');
    }

    loadStatistics() {
        // Load comprehensive statistics data from all pages
        this.statsData = {
            customers: {
                current: 24,
                change: 7,
                trend: [18, 19, 20, 21, 22, 23, 24],
                title: 'Customers',
                icon: 'fas fa-users',
                color: '#10B981',
                detail: 'Active customers in system'
            },
            orders: {
                current: 32,
                change: 5,
                trend: [28, 29, 30, 31, 31, 32, 32],
                title: 'Orders',
                icon: 'fas fa-clipboard-list',
                color: '#3B82F6',
                detail: 'Orders in progress'
            },
            income: {
                current: 2107,
                change: 12,
                trend: [1800, 1850, 1900, 1950, 2000, 2050, 2107],
                title: 'Income',
                icon: 'fas fa-dollar-sign',
                color: '#10B981',
                detail: 'Total income this month'
            },
            expenses: {
                current: 710,
                change: -3,
                trend: [730, 725, 720, 715, 712, 711, 710],
                title: 'Expenses',
                icon: 'fas fa-chart-line',
                color: '#EF4444',
                detail: 'Total expenses this month'
            },
            vehicles: {
                current: 89,
                change: 5.7,
                trend: [84, 85, 86, 87, 88, 89, 89],
                title: 'Vehicles',
                icon: 'fas fa-car',
                color: '#8B5CF6',
                detail: 'Total vehicles in fleet'
            },
            utilization: {
                current: 78.5,
                change: 3.3,
                trend: [75.2, 75.8, 76.4, 77.0, 77.6, 78.1, 78.5],
                title: 'Utilization',
                icon: 'fas fa-chart-pie',
                color: '#F59E0B',
                detail: 'Vehicle utilization rate'
            }
        };

        // Ensure DOM is ready before rendering
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.renderStatistics();
            });
        } else {
            this.renderStatistics();
        }
    }

    renderStatistics() {
        const statsContainer = document.querySelector('.stats-grid');
        if (!statsContainer) {
            console.error('❌ StatisticsComponent: Could not find .stats-grid element');
            return;
        }

        try {
            console.log('📊 StatisticsComponent: Rendering', Object.keys(this.statsData).length, 'statistics');
            statsContainer.innerHTML = '';

            Object.entries(this.statsData).forEach(([key, stat]) => {
                const statElement = this.createStatCard(key, stat);
                statsContainer.appendChild(statElement);
            });
            
            console.log('✅ StatisticsComponent: Rendered successfully');
        } catch (error) {
            console.error('❌ StatisticsComponent: Failed to render statistics:', error);
        }
    }

    createStatCard(key, stat) {
        const changeClass = stat.change >= 0 ? 'positive' : 'negative';
        const changeIcon = stat.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
        const changeText = stat.change >= 0 ? `${stat.change}%` : `${Math.abs(stat.change)}%`;
        
        // Format value based on type
        let value;
        if (key === 'income' || key === 'expenses') {
            value = `$${stat.current.toLocaleString()}`;
        } else if (key === 'utilization') {
            value = `${stat.current}%`;
        } else {
            value = stat.current.toLocaleString();
        }

        const statElement = document.createElement('div');
        statElement.className = 'stat-card';
        statElement.dataset.metric = key;
        
        statElement.innerHTML = `
            <div class="stat-header">
                <div class="stat-title-section">
                    <i class="${stat.icon || 'fas fa-chart-bar'}" style="color: ${stat.color || '#6B7280'}"></i>
                    <h3>${stat.title}</h3>
                </div>
                <div class="stat-change ${changeClass}">
                    <i class="fas ${changeIcon}"></i>
                    <span>${changeText}</span>
                </div>
            </div>
            <div class="stat-value">${value}</div>
            <div class="stat-chart">
                <svg class="mini-chart" viewBox="0 0 100 30">
                    <polyline class="chart-line" points="${this.generateChartPoints(stat.trend)}"></polyline>
                </svg>
                <div class="chart-labels">
                    <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                </div>
            </div>
        `;

        // Add click event for detailed view
        statElement.addEventListener('click', () => {
            this.showStatDetails(key, stat);
        });

        return statElement;
    }

    generateChartPoints(trend) {
        const max = Math.max(...trend);
        const min = Math.min(...trend);
        const range = max - min || 1;

        return trend.map((value, index) => {
            const x = (index / (trend.length - 1)) * 100;
            const y = 30 - ((value - min) / range) * 25;
            return `${x},${y}`;
        }).join(' ');
    }

    showStatDetails(key, stat) {
        // Create modal or expand view for detailed statistics
        const modal = document.createElement('div');
        modal.className = 'stat-modal';
        modal.innerHTML = `
            <div class="stat-modal-content">
                <div class="stat-modal-header">
                    <h3>${stat.title} Details</h3>
                    <button class="stat-modal-close">&times;</button>
                </div>
                <div class="stat-modal-body">
                    <div class="stat-detail-value">${key === 'income' || key === 'expenses' ? `$${stat.current.toLocaleString()}` : stat.current}</div>
                    <div class="stat-detail-change ${stat.change >= 0 ? 'positive' : 'negative'}">
                        <i class="fas ${stat.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'}"></i>
                        ${Math.abs(stat.change)}% from last week
                    </div>
                    <div class="stat-detail-chart">
                        <canvas id="stat-chart-${key}" width="400" height="200"></canvas>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.querySelector('.stat-modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Render detailed chart
        this.renderDetailedChart(key, stat.trend);
    }

    renderDetailedChart(key, trend) {
        const canvas = document.getElementById(`stat-chart-${key}`);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw chart
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        ctx.beginPath();

        trend.forEach((value, index) => {
            const x = (index / (trend.length - 1)) * width;
            const max = Math.max(...trend);
            const min = Math.min(...trend);
            const range = max - min || 1;
            const y = height - ((value - min) / range) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();
    }

    setupEventListeners() {
        // Layout controls
        const layoutButtons = document.querySelectorAll('.layout-btn');
        layoutButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const layout = e.target.dataset.layout;
                this.changeLayout(layout);
                
                // Update active button
                layoutButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Date filter
        const dateFilter = document.querySelector('.filter-select');
        if (dateFilter) {
            dateFilter.addEventListener('change', (e) => {
                this.updateDateRange(e.target.value);
            });
        }
    }

    changeLayout(layout) {
        const statsGrid = document.querySelector('.stats-grid');
        if (!statsGrid) return;

        // Remove existing layout classes
        statsGrid.classList.remove('layout-grid', 'layout-list', 'layout-compact');
        
        // Add new layout class
        statsGrid.classList.add(`layout-${layout}`);
        this.currentLayout = layout;
    }

    updateDateRange(range) {
        // Update statistics based on date range
        console.log(`Updating statistics for range: ${range}`);
        
        // Simulate data update
        setTimeout(() => {
            this.loadStatistics();
        }, 500);
    }

    // Real-time updates
    startRealTimeUpdates() {
        setInterval(() => {
            this.updateStatistics();
        }, 30000); // Update every 30 seconds
    }

    updateStatistics() {
        // Simulate real-time data changes
        Object.keys(this.statsData).forEach(key => {
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            this.statsData[key].current += change;
            this.statsData[key].trend.push(this.statsData[key].current);
            this.statsData[key].trend.shift();
        });
        
        this.renderStatistics();
    }

    // Public method to force re-render
    render() {
        console.log('📊 StatisticsComponent: Rendering statistics...');
        this.renderStatistics();
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StatisticsComponent;
} else {
    window.StatisticsComponent = StatisticsComponent;
}
