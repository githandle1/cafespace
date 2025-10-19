// CafeRank App - Interactive Cafe Discovery Map
class CafeRankApp {
    constructor() {
        this.map = null;
        this.userLocation = null;
        this.cafes = [];
        this.filteredCafes = [];
        this.selectedCafe = null;
        this.markers = [];
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.initMap();
        this.renderCafeList();
    }

    // Sample cafe data - in a real app, this would come from an API
    loadSampleData() {
        this.cafes = [
            {
                id: 1,
                name: "Blue Bottle Coffee",
                description: "Artisanal coffee with minimalist aesthetic and exceptional quality beans.",
                rating: 4.8,
                price: "$$",
                distance: 0.3,
                coordinates: { lat: 37.7749, lng: -122.4194 },
                tags: ["Specialty Coffee", "Minimalist", "WiFi"],
                hours: "7:00 AM - 6:00 PM",
                phone: "(415) 555-0123",
                address: "123 Market St, San Francisco, CA"
            },
            {
                id: 2,
                name: "Philz Coffee",
                description: "Hand-crafted, personalized coffee blends with a unique brewing method.",
                rating: 4.6,
                price: "$$",
                distance: 0.5,
                coordinates: { lat: 37.7849, lng: -122.4094 },
                tags: ["Hand-crafted", "Custom Blends", "Friendly Staff"],
                hours: "6:00 AM - 8:00 PM",
                phone: "(415) 555-0124",
                address: "456 Castro St, San Francisco, CA"
            },
            {
                id: 3,
                name: "Ritual Coffee Roasters",
                description: "Third-wave coffee roastery with seasonal single-origin offerings.",
                rating: 4.7,
                price: "$$$",
                distance: 0.7,
                coordinates: { lat: 37.7649, lng: -122.4294 },
                tags: ["Third-wave", "Single-origin", "Seasonal"],
                hours: "6:30 AM - 7:00 PM",
                phone: "(415) 555-0125",
                address: "789 Valencia St, San Francisco, CA"
            },
            {
                id: 4,
                name: "Sightglass Coffee",
                description: "Industrial-chic space with house-roasted beans and creative drinks.",
                rating: 4.5,
                price: "$$",
                distance: 0.9,
                coordinates: { lat: 37.7549, lng: -122.4394 },
                tags: ["House-roasted", "Industrial", "Creative Drinks"],
                hours: "7:00 AM - 6:00 PM",
                phone: "(415) 555-0126",
                address: "321 Mission St, San Francisco, CA"
            },
            {
                id: 5,
                name: "Four Barrel Coffee",
                description: "Local roastery with vintage equipment and community-focused atmosphere.",
                rating: 4.4,
                price: "$$",
                distance: 1.2,
                coordinates: { lat: 37.7449, lng: -122.4494 },
                tags: ["Local", "Vintage", "Community"],
                hours: "6:00 AM - 8:00 PM",
                phone: "(415) 555-0127",
                address: "654 Divisadero St, San Francisco, CA"
            },
            {
                id: 6,
                name: "Equator Coffees",
                description: "Sustainable coffee with fair-trade practices and cozy atmosphere.",
                rating: 4.3,
                price: "$$",
                distance: 1.5,
                coordinates: { lat: 37.7349, lng: -122.4594 },
                tags: ["Sustainable", "Fair-trade", "Cozy"],
                hours: "6:30 AM - 7:30 PM",
                phone: "(415) 555-0128",
                address: "987 Fillmore St, San Francisco, CA"
            }
        ];
        
        this.filteredCafes = [...this.cafes];
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterCafes(e.target.value);
        });

        document.getElementById('searchBtn').addEventListener('click', () => {
            const searchTerm = document.getElementById('searchInput').value;
            this.filterCafes(searchTerm);
        });

        // Location button
        document.getElementById('getLocationBtn').addEventListener('click', () => {
            this.getUserLocation();
        });

        // Sort functionality
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.sortCafes(e.target.value);
        });

        // Price filter buttons
        document.querySelectorAll('.price-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.price-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterByPrice(e.target.dataset.price);
            });
        });

        // Map controls
        document.getElementById('centerMapBtn').addEventListener('click', () => {
            this.centerMapOnUser();
        });

        document.getElementById('toggleViewBtn').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('cafeModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    initMap() {
        // Initialize map centered on San Francisco (default location)
        const defaultLocation = { lat: 37.7749, lng: -122.4194 };
        
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: defaultLocation,
            styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        });

        // Add markers for all cafes
        this.addCafeMarkers();
    }

    addCafeMarkers() {
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];

        this.filteredCafes.forEach(cafe => {
            const marker = new google.maps.Marker({
                position: cafe.coordinates,
                map: this.map,
                title: cafe.name,
                icon: {
                    url: this.getMarkerIcon(cafe.rating),
                    scaledSize: new google.maps.Size(40, 40)
                }
            });

            marker.addListener('click', () => {
                this.selectCafe(cafe);
                this.showCafeDetails(cafe);
            });

            this.markers.push(marker);
        });
    }

    getMarkerIcon(rating) {
        // Create a simple colored circle based on rating
        const color = rating >= 4.5 ? '#27ae60' : rating >= 4.0 ? '#f39c12' : '#e74c3c';
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="${color}" stroke="white" stroke-width="2"/>
                <text x="20" y="25" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">☕</text>
            </svg>
        `)}`;
    }

    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    // Update cafe distances based on user location
                    this.updateCafeDistances();
                    
                    // Center map on user location
                    this.map.setCenter(this.userLocation);
                    this.map.setZoom(15);
                    
                    // Add user location marker
                    new google.maps.Marker({
                        position: this.userLocation,
                        map: this.map,
                        title: 'Your Location',
                        icon: {
                            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="15" cy="15" r="12" fill="#667eea" stroke="white" stroke-width="3"/>
                                    <text x="15" y="19" text-anchor="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold">📍</text>
                                </svg>
                            `),
                            scaledSize: new google.maps.Size(30, 30)
                        }
                    });
                    
                    this.renderCafeList();
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Unable to get your location. Please enable location services.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    updateCafeDistances() {
        if (!this.userLocation) return;

        this.cafes.forEach(cafe => {
            const distance = this.calculateDistance(
                this.userLocation.lat,
                this.userLocation.lng,
                cafe.coordinates.lat,
                cafe.coordinates.lng
            );
            cafe.distance = Math.round(distance * 10) / 10;
        });
    }

    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 3959; // Earth's radius in miles
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    filterCafes(searchTerm) {
        const term = searchTerm.toLowerCase();
        this.filteredCafes = this.cafes.filter(cafe => 
            cafe.name.toLowerCase().includes(term) ||
            cafe.description.toLowerCase().includes(term) ||
            cafe.tags.some(tag => tag.toLowerCase().includes(term))
        );
        
        this.renderCafeList();
        this.addCafeMarkers();
    }

    filterByPrice(price) {
        if (price === 'all') {
            this.filteredCafes = [...this.cafes];
        } else {
            this.filteredCafes = this.cafes.filter(cafe => cafe.price === price);
        }
        
        this.renderCafeList();
        this.addCafeMarkers();
    }

    sortCafes(sortBy) {
        this.filteredCafes.sort((a, b) => {
            switch (sortBy) {
                case 'distance':
                    return a.distance - b.distance;
                case 'rating':
                    return b.rating - a.rating;
                case 'price':
                    return a.price.length - b.price.length;
                default:
                    return 0;
            }
        });
        
        this.renderCafeList();
    }

    renderCafeList() {
        const cafeList = document.getElementById('cafeList');
        
        if (this.filteredCafes.length === 0) {
            cafeList.innerHTML = '<div class="loading"><p>No cafes found matching your criteria.</p></div>';
            return;
        }

        cafeList.innerHTML = this.filteredCafes.map(cafe => `
            <div class="cafe-card ${this.selectedCafe?.id === cafe.id ? 'selected' : ''}" 
                 onclick="app.selectCafe(${cafe.id})">
                <div class="cafe-header">
                    <div>
                        <div class="cafe-name">${cafe.name}</div>
                        <div class="cafe-rating">
                            ${this.renderStars(cafe.rating)}
                            <span>${cafe.rating}</span>
                        </div>
                    </div>
                    <div class="cafe-price">${cafe.price}</div>
                </div>
                <div class="cafe-distance">${cafe.distance} miles away</div>
                <div class="cafe-description">${cafe.description}</div>
                <div class="cafe-tags">
                    ${cafe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    selectCafe(cafeId) {
        const cafe = this.cafes.find(c => c.id === cafeId);
        if (!cafe) return;
        
        this.selectedCafe = cafe;
        
        // Center map on selected cafe
        this.map.setCenter(cafe.coordinates);
        this.map.setZoom(16);
        
        // Update UI
        this.renderCafeList();
        
        // Show cafe details
        this.showCafeDetails(cafe);
    }

    showCafeDetails(cafe) {
        const modal = document.getElementById('cafeModal');
        const details = document.getElementById('cafeDetails');
        
        details.innerHTML = `
            <div class="cafe-detail-header">
                <h2>${cafe.name}</h2>
                <div class="cafe-detail-rating">
                    ${this.renderStars(cafe.rating)}
                    <span>${cafe.rating}/5</span>
                </div>
            </div>
            <div class="cafe-detail-info">
                <div class="info-row">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${cafe.address}</span>
                </div>
                <div class="info-row">
                    <i class="fas fa-clock"></i>
                    <span>${cafe.hours}</span>
                </div>
                <div class="info-row">
                    <i class="fas fa-phone"></i>
                    <span>${cafe.phone}</span>
                </div>
                <div class="info-row">
                    <i class="fas fa-dollar-sign"></i>
                    <span>${cafe.price}</span>
                </div>
                <div class="info-row">
                    <i class="fas fa-route"></i>
                    <span>${cafe.distance} miles away</span>
                </div>
            </div>
            <div class="cafe-detail-description">
                <h3>About</h3>
                <p>${cafe.description}</p>
            </div>
            <div class="cafe-detail-tags">
                <h3>Features</h3>
                <div class="tags-container">
                    ${cafe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="cafe-detail-actions">
                <button class="btn-primary" onclick="app.getDirections('${cafe.address}')">
                    <i class="fas fa-directions"></i>
                    Get Directions
                </button>
                <button class="btn-primary" onclick="app.rateCafe(${cafe.id})">
                    <i class="fas fa-star"></i>
                    Rate This Cafe
                </button>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('cafeModal').style.display = 'none';
    }

    getDirections(address) {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
        window.open(url, '_blank');
    }

    rateCafe(cafeId) {
        const rating = prompt('Rate this cafe (1-5):');
        if (rating && rating >= 1 && rating <= 5) {
            const cafe = this.cafes.find(c => c.id === cafeId);
            if (cafe) {
                cafe.rating = parseFloat(rating);
                this.renderCafeList();
                this.closeModal();
                alert('Thank you for your rating!');
            }
        }
    }

    centerMapOnUser() {
        if (this.userLocation) {
            this.map.setCenter(this.userLocation);
            this.map.setZoom(15);
        } else {
            this.getUserLocation();
        }
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = sidebar.style.display === 'none' ? 'flex' : 'none';
    }
}

// Initialize the app when the page loads
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new CafeRankApp();
});

// Google Maps API callback
function initMap() {
    // This function is called by Google Maps API
    // The actual map initialization is handled in the CafeRankApp class
}
