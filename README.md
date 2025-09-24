# 🛍️ Lorena Store - Fashion E-commerce Website

## 🚀 Live Demo
**Website:** [https://lorenastoreshop.vercel.app](https://lorenastoreshop.vercel.app)

## ✨ Features

### 🛒 Customer Features
- **Product Catalog** - Browse 38+ fashion products
- **Shopping Cart** - Add, remove, update quantities
- **User Authentication** - Secure login/signup system
- **Profile Management** - Personal dashboard with order history
- **Multiple Checkout Options** - WhatsApp, Email, Phone
- **Order Tracking** - Real-time order status
- **Security Verification** - 2FA for sensitive actions
- **Password Reset** - Secure password recovery

### 👨‍💼 Admin Features
- **Admin Dashboard** - Complete store management
- **Product Management** - Add, edit, delete products in real-time
- **Order Management** - View all orders with customer details
- **User Management** - Monitor registered users
- **Firebase Integration** - Real-time data synchronization
- **Analytics** - Sales and user statistics

### 🔧 Technical Features
- **Firebase Database** - Real-time data storage
- **Responsive Design** - Mobile-first approach
- **No External Dependencies** - Self-contained checkout system
- **Real-time Updates** - Live product and order sync
- **Security** - Authentication codes and verification
- **Performance** - Optimized loading and caching

## 🏗️ Architecture

```
Lorena Store
├── Frontend (Static HTML/CSS/JS)
├── Firebase Realtime Database
├── Authentication System
├── Admin Panel
└── Checkout System
```

## 📱 Pages

- **Homepage** (`index.html`) - Product showcase
- **Login/Signup** (`login.html`, `register.html`) - User authentication
- **Profile** (`profile.html`) - User dashboard
- **Admin Dashboard** (`admin-dashboard.html`) - Store management
- **Order Confirmation** (`orderPlaced.html`) - Order success page
- **Security** (`verify-access.html`, `forgot-password.html`) - Security features

## 🔐 Admin Access
- **URL:** `/admin-dashboard.html`
- **Username:** `Admin01`
- **Password:** `Adminlover1`

## 📧 Contact Integration
- **Email Orders:** `spanishfrenchexpress@gmail.com`
- **WhatsApp Orders:** `09050120553`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Deploy automatically
3. Custom domain: `lorenastoreshop.com`

### Manual Deployment
```bash
# Clone repository
git clone https://github.com/noah390/lorenastoreshop.com.git

# Deploy to any static hosting
# - Netlify
# - Vercel
# - GitHub Pages
# - Firebase Hosting
```

## 🛠️ Local Development

```bash
# Serve locally
npx serve .

# Or use any static server
python -m http.server 8000
```

## 📊 Firebase Configuration

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDSQ0LE6OgOlWBjFCSF8XuXRBjBqKVVMpE",
    authDomain: "lorena-store-9124a.firebaseapp.com",
    databaseURL: "https://lorena-store-9124a-default-rtdb.firebaseio.com/",
    projectId: "lorena-store-9124a"
};
```

## 🎯 Key Integrations

- **Firebase Realtime Database** - Product and order storage
- **WhatsApp API** - Direct customer communication
- **Email Integration** - Order notifications
- **Real-time Sync** - Live updates across all users

## 📈 Performance

- **Load Time:** < 2 seconds
- **Mobile Optimized:** 100% responsive
- **SEO Friendly:** Semantic HTML structure
- **Accessibility:** WCAG compliant

## 🔒 Security Features

- User authentication with session management
- Password reset with verification codes
- Admin access protection
- Input validation and sanitization
- Secure Firebase rules

## 📞 Support

For technical support or business inquiries:
- **Email:** spanishfrenchexpress@gmail.com
- **WhatsApp:** +234 905 012 0553

---

**© 2024 Lorena Store. All rights reserved.**