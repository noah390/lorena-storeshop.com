# Firebase Setup Instructions

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `lorena-store`
4. Disable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Services

### Firestore Database
1. Go to "Firestore Database" in left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select location closest to you
5. Click "Done"

### Authentication
1. Go to "Authentication" in left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password"
5. Click "Save"

### Storage
1. Go to "Storage" in left sidebar
2. Click "Get started"
3. Choose "Start in test mode"
4. Select same location as Firestore
5. Click "Done"

## 3. Get Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon (</>) 
4. Register app name: `lorena-store-web`
5. Copy the config object

## 4. Update Configuration

Replace the config in `js/firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id-here"
};
```

## 5. Create Admin User

1. Go to Authentication > Users
2. Click "Add user"
3. Email: `admin@lorenastore.com`
4. Password: `admin123` (change in production)
5. Click "Add user"

## 6. Set Firestore Rules (Optional - for production)

Go to Firestore > Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to products for everyone
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 7. Set Storage Rules (Optional - for production)

Go to Storage > Rules and update:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Features Implemented

✅ **Firestore Database**: Products stored with id, name, description, price, imageURL
✅ **Firebase Authentication**: Admin login with email/password
✅ **Firebase Storage**: Image upload and retrieval
✅ **Frontend Integration**: Products display from Firestore
✅ **Admin Panel**: Full CRUD operations for products
✅ **Free Tier Compatible**: All features work within Firebase free limits

## Free Tier Limits

- **Firestore**: 50K reads, 20K writes, 20K deletes per day
- **Authentication**: Unlimited users
- **Storage**: 5GB storage, 1GB downloads per day
- **Hosting**: 10GB storage, 360MB/day transfer

## Admin Panel

- **URL**: `/admin-firebase.html`
- **Login**: Use the admin user you created
- **Features**: Add, edit, delete products with image upload

## Testing

1. Open your website
2. Products should load from Firestore
3. Go to `/admin-firebase.html`
4. Login with admin credentials
5. Test adding, editing, and deleting products

Your e-commerce store is now fully powered by Firebase!