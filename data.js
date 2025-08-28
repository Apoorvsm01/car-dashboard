// Mock data for Carvo Dashboard
const mockData = {
    vehicles: [
        {
            id: 1,
            model: "Tesla Model 3",
            licensePlate: "ABC-123",
            status: "In use",
            location: { lat: 41.8781, lng: -87.6298 },
            image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
            placeholderIcon: "fas fa-car",
            customer: "John Smith",
            phone: "+1 (555) 123-4567",
            rentDueDate: "2024-01-15"
        },
        {
            id: 2,
            model: "BMW X5",
            licensePlate: "XYZ-789",
            status: "Available",
            location: { lat: 41.8801, lng: -87.6278 },
            image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
            placeholderIcon: "fas fa-car"
        },
        {
            id: 3,
            model: "Mercedes C-Class",
            licensePlate: "DEF-456",
            status: "In use",
            location: { lat: 41.8761, lng: -87.6318 },
            image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
            placeholderIcon: "fas fa-car",
            customer: "Sarah Johnson",
            phone: "+1 (555) 987-6543",
            rentDueDate: "2024-01-18"
        },
        {
            id: 4,
            model: "Audi A4",
            licensePlate: "GHI-789",
            status: "Maintenance",
            location: { lat: 41.8821, lng: -87.6258 },
            image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
            placeholderIcon: "fas fa-car"
        },
        {
            id: 5,
            model: "Toyota Camry",
            licensePlate: "JKL-012",
            status: "Available",
            location: { lat: 41.8741, lng: -87.6338 },
            image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
            placeholderIcon: "fas fa-car"
        }
    ],
    customers: [
        {
            id: 1,
            name: "John Smith",
            email: "john.smith@email.com",
            phone: "+1 (555) 123-4567",
            address: "123 Main St, Chicago, IL 60601",
            membership: "Premium",
            joinDate: "2023-01-15"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah.johnson@email.com",
            phone: "+1 (555) 987-6543",
            address: "456 Oak Ave, Chicago, IL 60602",
            membership: "Standard",
            joinDate: "2023-03-20"
        },
        {
            id: 3,
            name: "Mike Davis",
            email: "mike.davis@email.com",
            phone: "+1 (555) 456-7890",
            address: "789 Pine St, Chicago, IL 60603",
            membership: "Premium",
            joinDate: "2023-02-10"
        },
        {
            id: 4,
            name: "Emily Wilson",
            email: "emily.wilson@email.com",
            phone: "+1 (555) 321-0987",
            address: "321 Elm St, Chicago, IL 60604",
            membership: "Standard",
            joinDate: "2023-04-05"
        },
        {
            id: 5,
            name: "David Brown",
            email: "david.brown@email.com",
            phone: "+1 (555) 654-3210",
            address: "654 Maple Dr, Chicago, IL 60605",
            membership: "Premium",
            joinDate: "2023-01-30"
        }
    ],
    orders: [
        {
            id: 1001,
            vehicleId: 1,
            customerId: 1,
            startDate: "2024-01-10",
            endDate: "2024-01-15",
            totalAmount: 450,
            status: "Active"
        },
        {
            id: 1002,
            vehicleId: 3,
            customerId: 2,
            startDate: "2024-01-12",
            endDate: "2024-01-18",
            totalAmount: 600,
            status: "Active"
        },
        {
            id: 1003,
            vehicleId: 2,
            customerId: 3,
            startDate: "2024-01-20",
            endDate: "2024-01-25",
            totalAmount: 550,
            status: "Pending"
        },
        {
            id: 1004,
            vehicleId: 5,
            customerId: 4,
            startDate: "2024-01-15",
            endDate: "2024-01-17",
            totalAmount: 200,
            status: "Completed"
        },
        {
            id: 1005,
            vehicleId: 1,
            customerId: 5,
            startDate: "2024-01-25",
            endDate: "2024-01-30",
            totalAmount: 450,
            status: "Pending"
        }
    ],
    bookings: (() => {
        const today = new Date();
        const currentWeek = [];
        const currentMonth = [];
        
        // Generate bookings for current week
        for (let i = 0; i < 7; i++) {
            const day = new Date(today);
            day.setDate(today.getDate() + i);
            
            // Add 2-3 bookings per day
            const numBookings = Math.floor(Math.random() * 2) + 2;
            for (let j = 0; j < numBookings; j++) {
                const startHour = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
                const duration = Math.floor(Math.random() * 4) + 2; // 2-6 hours
                const endHour = startHour + duration;
                
                const startDate = new Date(day);
                startDate.setHours(startHour, 0, 0, 0);
                
                const endDate = new Date(day);
                endDate.setHours(endHour, 0, 0, 0);
                
                const vehicleId = Math.floor(Math.random() * 5) + 1;
                const customerId = Math.floor(Math.random() * 5) + 1;
                
                currentWeek.push({
                    id: `booking-${i}-${j}`,
                    vehicleId: vehicleId,
                    customerId: customerId,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString()
                });
            }
        }
        
        // Generate some bookings for the current month
        for (let i = 0; i < 30; i++) {
            const day = new Date(today);
            day.setDate(today.getDate() + i);
            
            if (Math.random() > 0.7) { // 30% chance of booking
                const startHour = Math.floor(Math.random() * 12) + 8;
                const duration = Math.floor(Math.random() * 4) + 2;
                const endHour = startHour + duration;
                
                const startDate = new Date(day);
                startDate.setHours(startHour, 0, 0, 0);
                
                const endDate = new Date(day);
                endDate.setHours(endHour, 0, 0, 0);
                
                const vehicleId = Math.floor(Math.random() * 5) + 1;
                const customerId = Math.floor(Math.random() * 5) + 1;
                
                currentMonth.push({
                    id: `month-booking-${i}`,
                    vehicleId: vehicleId,
                    customerId: customerId,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString()
                });
            }
        }
        
        return [...currentWeek, ...currentMonth];
    })(),
    statistics: {
        customers: {
            current: 1250,
            trend: [1200, 1210, 1220, 1230, 1240, 1250]
        },
        vehicles: {
            current: 45,
            trend: [42, 43, 44, 44, 45, 45]
        },
        bookings: {
            current: 89,
            trend: [85, 87, 88, 89, 89, 89]
        },
        revenue: {
            current: 12500,
            trend: [12000, 12200, 12300, 12400, 12500, 12500]
        }
    },
    mapCenter: {
        lat: 41.8781,
        lng: -87.6298
    }
};

