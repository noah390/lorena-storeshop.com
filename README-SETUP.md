# Lorena Store - Setup Instructions

## Email Configuration

To enable email notifications for orders, you need to set up Gmail App Password:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"
4. Replace `'your-app-password'` in `Backend/server.js` with your actual app password

## Starting the Application

1. **Start the Backend Server:**
   - Double-click `start-server.bat` OR
   - Open terminal in `Backend` folder and run `npm start`
   - Server runs on http://localhost:4000

2. **Open the Website:**
   - Open `index.html` in your browser
   - For admin panel, go to `admin.html`

## Features Implemented

✅ **Checkout System:**
- Customer details form
- Order processing with thank you message
- Order confirmation page

✅ **Email Notifications:**
- Automatic email to spanishfrenchexpress@gmail.com for each order
- Detailed order information in email

✅ **Admin Dashboard:**
- View all orders in real-time
- Order details with customer information
- Add, edit, delete products functionality
- Real-time statistics

✅ **Product Management:**
- Add new products with form
- Edit product stock quantities
- Delete products with confirmation
- Automatic product count updates

## Admin Access
- Username: admin
- Password: admin123

## Order Flow
1. Customer adds items to cart
2. Proceeds to checkout
3. Fills customer details
4. Places order
5. Order saved to database
6. Email sent to store owner
7. Thank you page with order details
8. Order appears in admin dashboard