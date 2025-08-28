class PixabayService {
    constructor() {
        // Get API key from configuration
        this.apiKey = window.getApiKey ? window.getApiKey('pixabay') : 'YOUR_PIXABAY_API_KEY';
        this.baseUrl = window.API_CONFIG ? window.API_CONFIG.PIXABAY.BASE_URL : 'https://pixabay.com/api/';
        this.cache = new Map();
        this.cacheExpiry = window.API_CONFIG ? window.API_CONFIG.PIXABAY.CACHE_DURATION : 24 * 60 * 60 * 1000;
        
        // Check if API key is properly set
        if (!this.isApiKeyValid()) {
            console.warn('⚠️ Pixabay API key not set. Using fallback images. Get your free key at: https://pixabay.com/api/docs/');
        }
    }

    isApiKeyValid() {
        return this.apiKey && this.apiKey !== 'YOUR_PIXABAY_API_KEY' && this.apiKey !== 'YOUR_PIXABAY_API_KEY_HERE' && this.apiKey.length > 20;
    }

    // Set API key (call this after getting your key from Pixabay)
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    // Search for images
    async searchImages(query, options = {}) {
        const cacheKey = `search_${query}_${JSON.stringify(options)}`;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheExpiry) {
                return cached.data;
            }
        }

        const params = new URLSearchParams({
            key: this.apiKey,
            q: query,
            image_type: options.imageType || 'photo',
            orientation: options.orientation || 'horizontal',
            min_width: options.minWidth || 400,
            min_height: options.minHeight || 300,
            per_page: options.perPage || 20,
            safesearch: 'true',
            order: 'popular'
        });

        try {
            const response = await fetch(`${this.baseUrl}?${params}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Cache the results
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });
            
            return data;
        } catch (error) {
            console.error('Pixabay API error:', error);
            return this.getFallbackImages(query);
        }
    }

    // Get vehicle images
    async getVehicleImages(brand, model) {
        const query = `${brand} ${model} car`;
        const data = await this.searchImages(query, {
            imageType: 'photo',
            orientation: 'horizontal',
            minWidth: 400,
            minHeight: 300,
            perPage: 5
        });
        
        return data.hits && data.hits.length > 0 ? data.hits[0] : null;
    }

    // Get customer avatar images
    async getCustomerAvatars() {
        const query = 'professional headshot portrait';
        const data = await this.searchImages(query, {
            imageType: 'photo',
            orientation: 'vertical',
            minWidth: 200,
            minHeight: 200,
            perPage: 10
        });
        
        return data.hits || [];
    }

    // Get car brand specific images
    async getCarBrandImages(brand) {
        const query = `${brand} car`;
        const data = await this.searchImages(query, {
            imageType: 'photo',
            orientation: 'horizontal',
            minWidth: 400,
            minHeight: 300,
            perPage: 3
        });
        
        return data.hits || [];
    }

    // Get fallback images when API fails
    getFallbackImages(query) {
        const fallbackImages = {
            'toyota': [
                'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop'
            ],
            'honda': [
                'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'
            ],
            'bmw': [
                'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop'
            ],
            'nissan': [
                'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'
            ],
            'daihatsu': [
                'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop'
            ],
            'portrait': [
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face'
            ]
        };

        const queryLower = query.toLowerCase();
        for (const [key, images] of Object.entries(fallbackImages)) {
            if (queryLower.includes(key)) {
                return {
                    hits: images.map((url, index) => ({
                        id: index,
                        webformatURL: url,
                        largeImageURL: url,
                        previewURL: url,
                        user: 'Unsplash',
                        tags: key
                    }))
                };
            }
        }

        // Default fallback
        return {
            hits: [{
                id: 0,
                webformatURL: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
                largeImageURL: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
                previewURL: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
                user: 'Unsplash',
                tags: 'car'
            }]
        };
    }

    // Get a random image from results
    getRandomImage(images) {
        if (!images || images.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }

    // Preload images for better performance
    async preloadImages(queries) {
        const promises = queries.map(query => this.searchImages(query));
        try {
            await Promise.all(promises);
            console.log('✅ Pixabay images preloaded successfully');
        } catch (error) {
            console.warn('⚠️ Some images failed to preload:', error);
        }
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
    }
}

// Make it globally available
window.PixabayService = PixabayService;
