# Pixabay API Setup Guide

## Overview
This dashboard now integrates with the [Pixabay API](https://pixabay.com/api/docs/) to provide high-quality, real images for vehicles, customers, and other content throughout the application.

## Getting Your Free API Key

### Step 1: Sign Up
1. Visit [Pixabay API Documentation](https://pixabay.com/api/docs/)
2. Click "Login" or "Sign up" in the top right corner
3. Create a free account

### Step 2: Get Your API Key
1. After logging in, go to the [API Documentation page](https://pixabay.com/api/docs/)
2. Your API key will be displayed at the top of the page
3. Copy the API key (it looks like: `12345678-1234567890abcdef1234567890abcdef`)

### Step 3: Configure the Dashboard
1. Open `assets/scripts/config/api-config.js`
2. Replace `YOUR_PIXABAY_API_KEY_HERE` with your actual API key:

```javascript
const API_CONFIG = {
    PIXABAY: {
        API_KEY: '12345678-1234567890abcdef1234567890abcdef', // Your actual key here
        // ... other settings
    }
};
```

## Features

### 🚗 Vehicle Images
- **Automatic Brand Detection**: Images are fetched based on vehicle brand (Toyota, Honda, BMW, etc.)
- **High Quality**: 400x300 minimum resolution
- **Cached Results**: 24-hour cache for better performance
- **Fallback System**: Uses Unsplash images if Pixabay is unavailable

### 👤 Customer Avatars
- **Professional Headshots**: High-quality portrait images
- **Random Selection**: Different avatars for each customer
- **Consistent Sizing**: 200x200 optimized for avatars

### 🔍 Search Integration
- **Global Search**: Search across all entities with real images
- **Real-time Results**: Instant image loading in search results
- **Attribution**: Proper credit to Pixabay photographers

## API Limits
- **Free Tier**: 100 requests per 60 seconds
- **Caching**: 24-hour cache to minimize API calls
- **Safe Search**: Enabled by default for family-friendly content

## Error Handling
- **Graceful Fallbacks**: Uses Unsplash images if API fails
- **Console Warnings**: Clear error messages for debugging
- **No Breaking**: Application continues to work without API key

## Testing
1. Set your API key in `api-config.js`
2. Refresh any page in the dashboard
3. Check browser console for success messages:
   - `✅ Vehicle images updated with Pixabay`
   - `✅ Order images updated with Pixabay`

## Troubleshooting

### API Key Not Working
- Verify the key is correctly copied from Pixabay
- Check browser console for error messages
- Ensure the key is properly formatted (no extra spaces)

### Images Not Loading
- Check internet connection
- Verify API key is set correctly
- Look for fallback images (Unsplash) as backup

### Rate Limit Exceeded
- Wait 60 seconds before making more requests
- Check cache settings in `api-config.js`
- Consider upgrading to paid Pixabay plan for higher limits

## Files Modified
- `assets/scripts/services/PixabayService.js` - Main API service
- `assets/scripts/config/api-config.js` - Configuration file
- `assets/scripts/components/MapComponent.js` - Vehicle images
- `assets/scripts/components/OrdersComponent.js` - Order images
- All HTML pages - Added service scripts

## Benefits
- **Professional Look**: Real, high-quality images
- **Better UX**: Visual consistency across the dashboard
- **Scalable**: Easy to add more image types
- **Free**: No cost for basic usage
- **Reliable**: Fallback system ensures uptime

## Support
- [Pixabay API Documentation](https://pixabay.com/api/docs/)
- [Pixabay Support](https://pixabay.com/support/)
- Check browser console for detailed error messages
