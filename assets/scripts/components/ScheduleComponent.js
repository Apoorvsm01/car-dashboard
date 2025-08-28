class ScheduleComponent {
    constructor() {
        this.currentDate = new Date();
        this.currentView = 'week';
        this.bookings = [];
        this.init();
    }

    init() {
        this.loadBookings();
        this.setupEventListeners();
        this.renderSchedule();
    }

    loadBookings() {
        // Load booking data
        this.bookings = [
            {
                id: 1,
                vehicleId: 1,
                customerId: 1,
                startDate: '2024-06-20T08:00:00',
                endDate: '2024-06-24T18:00:00',
                customer: 'Chris Evan',
                vehicle: 'Toyota Avanza 1.5 A/T',
                licensePlate: 'B 3243 ABC'
            },
            {
                id: 2,
                vehicleId: 2,
                customerId: 2,
                startDate: '2024-06-22T10:00:00',
                endDate: '2024-06-25T16:00:00',
                customer: 'Chris Hemsworth',
                vehicle: 'Daihatsu Xenia 1.3 M M/T',
                licensePlate: 'B 7221 XYZ'
            },
            {
                id: 3,
                vehicleId: 3,
                customerId: 3,
                startDate: '2024-06-23T09:00:00',
                endDate: '2024-06-26T17:00:00',
                customer: 'Wirman Mustafa',
                vehicle: 'Honda Civic 1.8 E C/T',
                licensePlate: 'B 4567 KLM'
            },
            {
                id: 4,
                vehicleId: 4,
                customerId: 4,
                startDate: '2024-07-01T08:00:00',
                endDate: '2024-07-05T18:00:00',
                customer: 'Bustomi Rizal Subaiki',
                vehicle: 'Nissan X-Trail 2.5 C/T',
                licensePlate: 'B 1234 NOP'
            }
        ];
    }

    setupEventListeners() {
        // Navigation buttons
        const prevBtn = document.getElementById('schedule-prev');
        const nextBtn = document.getElementById('schedule-next');
        const todayBtn = document.getElementById('schedule-today');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateSchedule(-1));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateSchedule(1));
        }

        if (todayBtn) {
            todayBtn.addEventListener('click', () => this.goToToday());
        }

        // View controls
        const viewTabs = document.querySelectorAll('.schedule-tab');
        viewTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.changeScheduleView(e.target.dataset.view);
            });
        });
    }

    navigateSchedule(direction) {
        switch (this.currentView) {
            case 'day':
                this.currentDate.setDate(this.currentDate.getDate() + direction);
                break;
            case 'week':
                this.currentDate.setDate(this.currentDate.getDate() + (direction * 7));
                break;
            case 'month':
                this.currentDate.setMonth(this.currentDate.getMonth() + direction);
                break;
        }
        this.renderSchedule();
    }

    goToToday() {
        this.currentDate = new Date();
        this.renderSchedule();
    }

    changeScheduleView(view) {
        this.currentView = view;
        
        // Update active tab
        document.querySelectorAll('.schedule-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        this.renderSchedule();
    }

    renderSchedule() {
        try {
            this.updateMonthDisplay();
            this.renderTimeSlots();
            this.renderDaysHeader();
            this.renderScheduleGrid();
            console.log('✅ ScheduleComponent: Schedule rendered successfully');
        } catch (error) {
            console.error('❌ ScheduleComponent: Failed to render schedule:', error);
        }
    }

    updateMonthDisplay() {
        const monthYearElement = document.getElementById('current-month-year');
        if (monthYearElement) {
            const monthName = this.currentDate.toLocaleDateString('en-US', { month: 'long' });
            const year = this.currentDate.getFullYear();
            monthYearElement.textContent = `${monthName} ${year}`;
        }
    }

    renderTimeSlots() {
        const timeSlots = document.getElementById('time-slots');
        if (!timeSlots) return;
        
        timeSlots.innerHTML = '';

        for (let hour = 0; hour < 24; hour++) {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = `${hour.toString().padStart(2, '0')}:00`;
            timeSlots.appendChild(timeSlot);
        }
    }

    renderDaysHeader() {
        const daysHeader = document.getElementById('schedule-days-header');
        if (!daysHeader) return;
        
        daysHeader.innerHTML = '';
        
        const days = this.getDaysForCurrentView();
        const today = new Date();
        
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            
            const isToday = day.toDateString() === today.toDateString();
            if (isToday) dayHeader.classList.add('today');
            
            dayHeader.innerHTML = `
                <div class="day-name">${day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div class="day-date">${day.getDate()}</div>
            `;
            
            daysHeader.appendChild(dayHeader);
        });
    }

    renderScheduleGrid() {
        const scheduleGrid = document.getElementById('schedule-grid');
        const scheduleContainer = document.querySelector('.schedule-container');
        
        if (!scheduleGrid) return;
        
        // Toggle month view class
        if (this.currentView === 'month') {
            scheduleContainer.classList.add('month-view');
        } else {
            scheduleContainer.classList.remove('month-view');
        }
        
        scheduleGrid.innerHTML = '';
        
        const days = this.getDaysForCurrentView();
        
        days.forEach(day => {
            const dayColumn = document.createElement('div');
            dayColumn.className = 'schedule-day-column';
            
            if (this.currentView === 'month') {
                // Month view: show day number and bookings
                const dayNumber = document.createElement('div');
                dayNumber.className = 'day-number';
                
                const today = new Date();
                const isToday = day.toDateString() === today.toDateString();
                const isCurrentMonth = day.getMonth() === this.currentDate.getMonth();
                
                if (isToday) {
                    dayNumber.classList.add('today');
                }
                if (!isCurrentMonth) {
                    dayNumber.classList.add('other-month');
                }
                
                dayNumber.textContent = day.getDate();
                dayColumn.appendChild(dayNumber);
                
                // Add bookings for this day
                this.addBookingsToDay(dayColumn, day);
            } else {
                // Week/Day view: create time cells
                for (let hour = 0; hour < 24; hour++) {
                    const cell = document.createElement('div');
                    cell.className = 'schedule-cell';
                    cell.dataset.date = day.toISOString().split('T')[0];
                    cell.dataset.hour = hour;
                    
                    dayColumn.appendChild(cell);
                }
                
                // Add bookings for this day
                this.addBookingsToDay(dayColumn, day);
            }
            
            scheduleGrid.appendChild(dayColumn);
        });
    }

    getDaysForCurrentView() {
        const days = [];
        const startDate = new Date(this.currentDate);
        
        switch (this.currentView) {
            case 'day':
                days.push(startDate);
                break;
            case 'week':
                // Get start of week (Sunday)
                const dayOfWeek = startDate.getDay();
                startDate.setDate(startDate.getDate() - dayOfWeek);
                
                for (let i = 0; i < 7; i++) {
                    const day = new Date(startDate);
                    day.setDate(startDate.getDate() + i);
                    days.push(day);
                }
                break;
            case 'month':
                // Get first day of month
                const year = startDate.getFullYear();
                const month = startDate.getMonth();
                const firstDayOfMonth = new Date(year, month, 1);
                const firstDayOfWeek = firstDayOfMonth.getDay();
                
                // Start from the Sunday before the first day of the month
                const startOfCalendar = new Date(firstDayOfMonth);
                startOfCalendar.setDate(1 - firstDayOfWeek);
                
                // Show 6 weeks (42 days) to cover all possibilities
                for (let i = 0; i < 42; i++) {
                    const day = new Date(startOfCalendar);
                    day.setDate(startOfCalendar.getDate() + i);
                    days.push(day);
                }
                break;
        }
        
        return days;
    }

    addBookingsToDay(dayColumn, day) {
        const dayBookings = this.getBookingsForDay(day);
        
        dayBookings.forEach(booking => {
            const bookingElement = this.createBookingElement(booking, day);
            dayColumn.appendChild(bookingElement);
        });
    }

    getBookingsForDay(day) {
        const dayString = day.toISOString().split('T')[0];
        
        return this.bookings.filter(booking => {
            const bookingStartDate = new Date(booking.startDate).toISOString().split('T')[0];
            const bookingEndDate = new Date(booking.endDate).toISOString().split('T')[0];
            
            return dayString >= bookingStartDate && dayString <= bookingEndDate;
        });
    }

    createBookingElement(booking, day) {
        const bookingElement = document.createElement('div');
        bookingElement.className = `booking-item vehicle-${booking.vehicleId}`;
        bookingElement.dataset.bookingId = booking.id;
        
        const startTime = this.formatTime(booking.startDate);
        const endTime = this.formatTime(booking.endDate);
        
        bookingElement.innerHTML = `
            <div class="booking-time">${startTime} - ${endTime}</div>
            <div class="booking-customer">${booking.customer}</div>
            <div class="booking-vehicle">${booking.licensePlate}</div>
        `;
        
        this.positionBooking(bookingElement, booking, day);
        
        // Add click event
        bookingElement.addEventListener('click', () => {
            this.showBookingDetails(booking);
        });
        
        return bookingElement;
    }

    positionBooking(bookingElement, booking, day) {
        if (this.currentView === 'month') {
            // Month view positioning is handled by CSS
            return;
        }

        const startTime = new Date(booking.startDate);
        const endTime = new Date(booking.endDate);
        
        const startHour = startTime.getHours() + (startTime.getMinutes() / 60);
        const endHour = endTime.getHours() + (endTime.getMinutes() / 60);
        const duration = Math.max(1, endHour - startHour);
        
        bookingElement.style.top = `${startHour * 60}px`;
        bookingElement.style.height = `${duration * 60}px`;
    }

    showBookingDetails(booking) {
        // Create modal for booking details
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Booking Details</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="booking-detail">
                        <h4>${booking.customer}</h4>
                        <div class="detail-row">
                            <span class="detail-label">Vehicle:</span>
                            <span class="detail-value">${booking.vehicle}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">License Plate:</span>
                            <span class="detail-value">${booking.licensePlate}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Start Date:</span>
                            <span class="detail-value">${new Date(booking.startDate).toLocaleString()}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">End Date:</span>
                            <span class="detail-value">${new Date(booking.endDate).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    }

    // Get booking by ID
    getBookingById(id) {
        return this.bookings.find(booking => booking.id === id);
    }

    // Add new booking
    addBooking(booking) {
        this.bookings.push(booking);
        this.renderSchedule();
    }

    // Update booking
    updateBooking(id, updates) {
        const booking = this.getBookingById(id);
        if (booking) {
            Object.assign(booking, updates);
            this.renderSchedule();
        }
    }

    // Delete booking
    deleteBooking(id) {
        this.bookings = this.bookings.filter(booking => booking.id !== id);
        this.renderSchedule();
    }

    // Public render method
    render() {
        console.log('📅 ScheduleComponent: Rendering schedule...');
        this.renderSchedule();
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScheduleComponent;
} else {
    window.ScheduleComponent = ScheduleComponent;
}
