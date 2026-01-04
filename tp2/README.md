# Les Bonnes Pièces - Auto Parts Web Application

A Vue.js-based web application for browsing and purchasing auto parts. This project showcases a modern e-commerce interface with product filtering, search functionality, and a shopping cart system.

## Features

- **Product Catalog**: Display of auto parts with images, names, categories, and prices
- **Search Functionality**: Real-time search through product names
- **Category Filtering**: Filter products by categories (Électricité, Filtration, Moteur, etc.)
- **Availability Status**: Visual indication of product availability
- **Shopping Cart**: Add available products to cart with confirmation alerts
- **Responsive Design**: Mobile-friendly layout with adaptive grid system
- **Modern UI**: Clean, professional design with hover effects and smooth transitions

## Technologies Used

- **Vue.js 3**: Progressive JavaScript framework for building user interfaces
- **HTML5**: Semantic markup structure
- **CSS3**: Custom styling with responsive design
- **JavaScript (ES6+)**: Modern JavaScript for application logic

## Project Structure

```
tp2/
├── index.html          # Main HTML file
├── script.js           # Vue.js application logic
├── styles.css          # Application styling
├── pieces-autos.json   # Product data (JSON format)
├── images/             # Product images
│   └── logo-les-bonnes-pieces.png
└── README.md           # This file
```

## Setup and Installation

1. **Clone or Download**: Ensure you have the `tp2/` folder in your project directory.

2. **File Structure**: Make sure all files are in the correct locations as shown above.

3. **Open in Browser**: Simply open `index.html` in a modern web browser that supports ES6 modules.

No additional installation or build process is required - this is a vanilla JavaScript/Vue.js application.

## Usage

1. **Browse Products**: View the catalog of auto parts displayed in a responsive grid.
2. **Search**: Use the search bar to find specific parts by name.
3. **Filter by Category**: Select a category from the dropdown to filter products.
4. **Add to Cart**: Click "Ajouter au panier" on available products to add them to your cart.
5. **View Details**: Each product card shows name, category, price, and availability status.

## Data Structure

Products are stored in `pieces-autos.json` with the following structure:
```json
{
  "id": 1,
  "nom": "Batterie 12V",
  "prix": 120,
  "categorie": "Électricité",
  "disponible": true,
  "image": "image1.jpg"
}
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

Requires a modern browser with support for:
- ES6 modules
- Vue.js 3
- CSS Grid and Flexbox

## Development Notes

- The application uses Vue.js in global mode via CDN for simplicity.
- Product images should be placed in the `images/` directory.
- The app filters out unavailable products by default in the display.
- Cart functionality is basic (adds to array and shows alert).

## Contributing

To modify or extend the application:
1. Edit `script.js` for Vue logic
2. Modify `styles.css` for styling changes
3. Update `pieces-autos.json` for product data
4. Adjust `index.html` for structural changes

## License

This project is for educational purposes.
