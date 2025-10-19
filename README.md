# CafeRank - Interactive Cafe Discovery Map 🗺️☕

A beautiful, interactive web application that helps you discover and rank amazing cafes nearby. Built with modern web technologies and featuring real-time map integration.

## Features ✨

- **Interactive Map**: View cafes on an interactive Google Maps interface
- **Smart Filtering**: Filter cafes by price range, rating, and distance
- **Search Functionality**: Search cafes by name, description, or tags
- **Location Services**: Find cafes near your current location
- **Cafe Details**: Detailed information including hours, contact, and features
- **Rating System**: Rate cafes and see community ratings
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Beautiful, modern interface with smooth animations

## Getting Started 🚀

### Prerequisites
- A modern web browser
- Google Maps API key (free from Google Cloud Console)

### Setup Instructions

1. **Get a Google Maps API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "Maps JavaScript API"
   - Create credentials (API Key)
   - Copy your API key

2. **Configure the API Key**:
   - Open `index.html`
   - Replace `YOUR_API_KEY` in the Google Maps script tag with your actual API key:
   ```html
   <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&callback=initMap"></script>
   ```

3. **Open the Application**:
   - Simply open `index.html` in your web browser
   - Or serve it using a local web server for better performance

### Using a Local Server (Recommended)

For the best experience, serve the files using a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## How to Use 📱

1. **Find Your Location**: Click "Find Nearby" to get cafes near your current location
2. **Browse Cafes**: Scroll through the cafe list on the left sidebar
3. **Filter Results**: Use the price range buttons and sort dropdown to narrow down results
4. **Search**: Type in the search box to find cafes by name or features
5. **View Details**: Click on any cafe card or map marker to see detailed information
6. **Get Directions**: Use the "Get Directions" button to open Google Maps navigation
7. **Rate Cafes**: Rate cafes you've visited to help others discover great spots

## Sample Data 🏪

The app comes with sample cafe data for San Francisco, including:
- Blue Bottle Coffee
- Philz Coffee
- Ritual Coffee Roasters
- Sightglass Coffee
- Four Barrel Coffee
- Equator Coffees

Each cafe includes realistic details like ratings, prices, hours, and features.

## Customization 🎨

### Adding Your Own Cafes

To add cafes for your area, edit the `loadSampleData()` function in `script.js`:

```javascript
this.cafes = [
    {
        id: 1,
        name: "Your Cafe Name",
        description: "Description of your cafe",
        rating: 4.5,
        price: "$$",
        distance: 0.5,
        coordinates: { lat: YOUR_LAT, lng: YOUR_LNG },
        tags: ["WiFi", "Outdoor Seating", "Pet Friendly"],
        hours: "7:00 AM - 6:00 PM",
        phone: "(555) 123-4567",
        address: "123 Your Street, Your City, State"
    },
    // Add more cafes...
];
```

### Styling Customization

The app uses CSS custom properties and modern styling. Key files to customize:
- `styles.css` - Main styling and layout
- `index.html` - Structure and content
- `script.js` - Functionality and data

## Technologies Used 🛠️

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox, grid, and animations
- **JavaScript (ES6+)**: Modern JavaScript with classes and async/await
- **Google Maps API**: Interactive maps and location services
- **Font Awesome**: Beautiful icons
- **Google Fonts**: Inter font family for modern typography

## Browser Support 🌐

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements 🚀

- Real-time cafe data integration
- User accounts and personalized recommendations
- Photo galleries for each cafe
- Social features (reviews, check-ins)
- Offline support with service workers
- Progressive Web App (PWA) capabilities

## License 📄

This project is open source and available under the MIT License.

## Contributing 🤝

Feel free to fork this project and submit pull requests for any improvements!

---

**Enjoy discovering amazing cafes! ☕✨**
