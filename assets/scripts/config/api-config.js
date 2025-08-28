// API Configuration
const API_CONFIG = {
    // Pixabay API Configuration
    PIXABAY: {
        // Get your free API key from: https://pixabay.com/api/docs/
        API_KEY: '25066303-c7d6936c2b1596ccb89c9d648', // Your actual API key
        
        // API Settings
        BASE_URL: 'https://pixabay.com/api/',
        RATE_LIMIT: 100, // requests per 60 seconds
        CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        
        // Image Settings
        DEFAULT_IMAGE_TYPE: 'photo',
        DEFAULT_ORIENTATION: 'horizontal',
        MIN_WIDTH: 400,
        MIN_HEIGHT: 300,
        PER_PAGE: 20,
        SAFE_SEARCH: true,
        ORDER: 'popular'
    },
    
    // Other API configurations can be added here
    MAPS: {
        // Google Maps or other mapping service config
        API_KEY: 'YOUR_MAPS_API_KEY_HERE'
    }
};

// Helper function to get API key
function getApiKey(service) {
    switch(service) {
        case 'pixabay':
            return API_CONFIG.PIXABAY.API_KEY;
        case 'maps':
            return API_CONFIG.MAPS.API_KEY;
        default:
            console.warn(`Unknown API service: ${service}`);
            return null;
    }
}

// Helper function to check if API key is set
function isApiKeySet(service) {
    const key = getApiKey(service);
    return key && key !== `YOUR_${service.toUpperCase()}_API_KEY_HERE`;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, getApiKey, isApiKeySet };
} else {
    window.API_CONFIG = API_CONFIG;
    window.getApiKey = getApiKey;
    window.isApiKeySet = isApiKeySet;
}
