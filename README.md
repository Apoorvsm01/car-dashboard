# 🚗 Car Dashboard

A modern, responsive car rental management dashboard built with HTML, CSS, and JavaScript. Features real-time vehicle tracking, order management, customer data, and beautiful UI with Pixabay image integration.

## ✨ Features

### 🗺️ **Interactive Map**
- Real-time vehicle tracking with Leaflet.js
- 6 specific vehicles with custom car markers
- Full-width popup images with vehicle details
- Dynamic location updates

### 📊 **Statistics Dashboard**
- Real-time fleet statistics
- Revenue tracking and analytics
- Vehicle utilization metrics
- Customer satisfaction ratings

### 📋 **Order Management**
- Complete order lifecycle management
- Customer and vehicle assignment
- Status tracking (Active, Completed, Pending)
- Search and filter functionality

### 🚙 **Vehicle Management**
- 6-vehicle fleet with detailed information
- High-quality vehicle images from Pixabay
- Status tracking and maintenance alerts
- Daily rate management

### 👥 **Customer Management**
- Customer database with avatars
- Contact information and rental history
- Professional headshots from Pixabay

### 📅 **Schedule & Calendar**
- FullCalendar.js integration
- Day/Week/Month views
- Event management and scheduling
- Google Calendar-like interface

### 🔍 **Global Search**
- Apple Spotlight-style search overlay
- Search across all data (vehicles, customers, orders)
- Keyboard shortcuts (Cmd/Ctrl + K)
- Interactive results with popup details

## 🚀 Live Demo

**Visit the live dashboard:** [Your GitHub Pages URL will be here]

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapping**: Leaflet.js
- **Calendar**: FullCalendar.js
- **Icons**: Font Awesome
- **Images**: Pixabay API
- **Styling**: Custom CSS with CSS Grid & Flexbox
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
Car Dashboard/
├── public/                     # Main HTML pages
│   ├── index.html             # Dashboard home page
│   ├── vehicles.html          # Vehicle management
│   ├── orders.html            # Order management
│   ├── customers.html         # Customer management
│   ├── reports.html           # Analytics & reports
│   └── app.js                 # Main application script
├── assets/
│   ├── styles/                # CSS files
│   │   ├── layout.css         # Main layout styles
│   │   └── components/        # Component-specific styles
│   └── scripts/
│       ├── components/        # JavaScript components
│       ├── services/          # API services
│       └── config/            # Configuration files
└── README.md                  # This file
```

## 🎯 Vehicle Fleet

The dashboard manages a fleet of 6 premium vehicles:

1. **Toyota Avalon V6** - Chris Evan (B 3243 ABC)
2. **Honda Civic 1.8 E C/T** - Sarah Johnson (B 1234 DEF)
3. **Toyota Rav4** - Michael Chen (B 5678 GHI)
4. **Lexus ES 350** - Emily Davis (B 9012 JKL)
5. **Nissan X-Trail 2.5 CVT** - David Wilson (B 3456 MNO)
6. **Acura RDX** - Lisa Anderson (B 7890 PQR)

## 🖼️ Image Integration

- **Pixabay API**: High-quality vehicle and customer images
- **Real-time Loading**: Dynamic image fetching
- **Fallback System**: Graceful degradation if API unavailable
- **Caching**: 24-hour image cache for performance

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for development)

### Local Development
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/car-dashboard.git
   cd car-dashboard
   ```

2. **Start local server**
   ```bash
   python3 -m http.server 8000
   # or
   npx serve public
   ```

3. **Open in browser**
   ```
   http://localhost:8000/public/index.html
   ```

### Pixabay API Setup (Optional)
1. Get free API key from [Pixabay](https://pixabay.com/api/docs/)
2. Update `assets/scripts/config/api-config.js`
3. Replace `YOUR_PIXABAY_API_KEY_HERE` with your actual key

## 🎨 Design Features

### **Modern UI/UX**
- Dark theme with green accent colors
- Smooth animations and transitions
- Responsive grid layouts
- Professional typography

### **Interactive Elements**
- Hover effects and micro-interactions
- Drag-and-drop functionality
- Real-time data updates
- Modal popups and overlays

### **Accessibility**
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Semantic HTML structure

## 📱 Responsive Design

- **Desktop**: Full-featured dashboard with side-by-side layouts
- **Tablet**: Optimized grid layouts and touch interactions
- **Mobile**: Stacked layouts with mobile-friendly navigation

## 🔧 Customization

### **Adding New Vehicles**
1. Update vehicle data in `MapComponent.js`
2. Add corresponding order in `OrdersComponent.js`
3. Update vehicle options in HTML forms

### **Modifying Styles**
- Main styles: `assets/styles/layout.css`
- Component styles: `assets/styles/components/`
- Color scheme: CSS variables in `:root`

### **API Configuration**
- Pixabay settings: `assets/scripts/config/api-config.js`
- Service configuration: `assets/scripts/services/`

## 🐛 Troubleshooting

### **Common Issues**
- **Images not loading**: Check Pixabay API key configuration
- **Map not displaying**: Ensure Leaflet.js is loaded
- **Calendar not working**: Verify FullCalendar.js is included

### **Browser Compatibility**
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the Pixabay setup guide

---

**Built with ❤️ for modern car rental management**