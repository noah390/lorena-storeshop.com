# Frontend Setup for Render API

## Important: Update API URL

Before deploying, you MUST update the API URL in these files:

### 1. Update content.js
Replace `https://my-render-app.onrender.com` with your actual Render app URL in:
- Line 8: `const response = await fetch('https://YOUR-RENDER-APP.onrender.com/products');`
- Line 44: `const response = await fetch('https://YOUR-RENDER-APP.onrender.com/products');`
- Line 68: `const response = await fetch('https://YOUR-RENDER-APP.onrender.com/products');`

### 2. Update contentDetails.js
Replace `https://my-render-app.onrender.com` with your actual Render app URL in:
- Line 8: `const response = await fetch('https://YOUR-RENDER-APP.onrender.com/products');`

### 3. Update Backend/cart.js
Replace `https://my-render-app.onrender.com` with your actual Render app URL in:
- Line 8: `const response = await fetch('https://YOUR-RENDER-APP.onrender.com/products');`

### 4. Update admin-panel.html
Replace `https://my-render-app.onrender.com` with your actual Render app URL in:
- Line 108: `const API_URL = 'https://YOUR-RENDER-APP.onrender.com';`

## Features Implemented

✅ **Homepage Products**: Fetches and displays all products from your Render API
✅ **Admin Panel**: Complete admin interface at `/admin-panel.html`
✅ **Authentication**: JWT-based admin login
✅ **CRUD Operations**: Add, edit, delete products
✅ **Error Handling**: User-friendly error messages
✅ **Success Messages**: Confirmation for all actions
✅ **Responsive Design**: Works on mobile and desktop

## Admin Panel Features

- **Login**: Email + password authentication
- **Add Products**: Name, description, price, image URL
- **Edit Products**: Click edit button to modify existing products
- **Delete Products**: Remove products with confirmation
- **Real-time Updates**: Product list updates immediately after changes

## Default Admin Credentials

- Email: `admin@lorenastore.com`
- Password: `admin123`

## API Endpoints Used

- `GET /products` - Fetch all products (public)
- `POST /api/auth/login` - Admin login
- `POST /api/products` - Add product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

## Testing

1. Open your website
2. Products should load on homepage
3. Go to `/admin-panel.html`
4. Login with admin credentials
5. Test adding, editing, and deleting products

## Deployment

1. Update all API URLs as mentioned above
2. Deploy to GitHub Pages or any static hosting
3. Your frontend will connect to your Render backend

Your e-commerce store is now fully connected to your Render API!