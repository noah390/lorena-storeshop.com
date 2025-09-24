# 🚀 GitHub Pages Deployment Instructions

## Prerequisites
- GitHub account
- Firebase project setup
- Formspree account (for email checkout)

## Step 1: Firebase Setup

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "lorena-store")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 1.2 Enable Required Services

**Firestore Database:**
1. Go to "Firestore Database" → "Create database"
2. Choose "Start in test mode"
3. Select location closest to your users

**Authentication:**
1. Go to "Authentication" → "Get started"
2. Go to "Sign-in method" tab
3. Enable "Email/Password"
4. Click "Save"

**Storage:**
1. Go to "Storage" → "Get started"
2. Choose "Start in test mode"
3. Select same location as Firestore

### 1.3 Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click Web icon (</>) 
4. Register app name: "Lorena Store"
5. Copy the config object
6. Replace the config in `firebase-config.js`:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

### 1.4 Create Admin User
1. Go to Authentication → Users
2. Click "Add user"
3. Enter email: `admin@yourstore.com`
4. Enter secure password
5. Click "Add user"

### 1.5 Set Firestore Rules
Go to Firestore → Rules and paste:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 1.6 Set Storage Rules
Go to Storage → Rules and paste:
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

## Step 2: Formspree Setup (Email Checkout)

1. Go to [Formspree.io](https://formspree.io/)
2. Sign up for free account
3. Create new form
4. Copy your form endpoint (e.g., `https://formspree.io/f/xabc123`)
5. Update the action URL in `index.html`:
```html
<form id="formspree-form" action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
```
6. Update the `_next` field with your GitHub Pages URL:
```html
<input type="hidden" name="_next" value="https://yourusername.github.io/your-repo/thank-you.html">
```

## Step 3: GitHub Repository Setup

### 3.1 Create Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Repository name: `lorena-store` (or your choice)
4. Make it **Public**
5. Don't initialize with README
6. Click "Create repository"

### 3.2 Upload Files
**Required files in root directory:**
- `index.html`
- `admin.html`
- `script.js`
- `firebase-config.js`
- `thank-you.html`
- `header.html`
- `footer.html`
- `slider.html`
- `content.html`
- All CSS files in `css/` folder
- All JS files in `js/` folder

**Upload via Web Interface:**
1. Click "uploading an existing file"
2. Drag all files to upload area
3. Commit message: "Initial e-commerce setup"
4. Click "Commit changes"

**Or via Git Commands:**
```bash
git init
git add .
git commit -m "Initial e-commerce setup"
git branch -M main
git remote add origin https://github.com/yourusername/lorena-store.git
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to repository Settings
2. Scroll to "Pages" section
3. Source: "Deploy from a branch"
4. Branch: "main"
5. Folder: "/ (root)"
6. Click "Save"

## Step 5: Access Your Live Website

Your website will be available at:
```
https://yourusername.github.io/lorena-store/
```

Admin panel:
```
https://yourusername.github.io/lorena-store/admin.html
```

## Step 6: Testing Checklist

### ✅ Storefront Testing
- [ ] Website loads correctly
- [ ] Products display (will show demo data initially)
- [ ] Cart functionality works
- [ ] WhatsApp checkout opens with correct number
- [ ] Email checkout submits to Formspree
- [ ] Phone checkout dials correct number
- [ ] Mobile responsive design works

### ✅ Admin Panel Testing
- [ ] Admin login works with Firebase credentials
- [ ] Can add new products with images
- [ ] Can edit existing products
- [ ] Can delete products
- [ ] Images upload to Firebase Storage
- [ ] Products appear on storefront immediately

### ✅ Firebase Integration
- [ ] Products save to Firestore
- [ ] Images upload to Firebase Storage
- [ ] Authentication works
- [ ] Real-time updates work

## Step 7: Customization

### Update Contact Information
Edit these files with your details:
- `script.js` (WhatsApp number: line with `2349050120553`)
- `footer.html` (contact section)
- `thank-you.html` (contact info)

### Add Your Products
1. Go to admin panel
2. Login with Firebase credentials
3. Click "Add Product"
4. Fill details and upload image
5. Products appear on storefront instantly

### Customize Design
- Edit CSS files in `css/` folder
- Modify colors, fonts, layout
- Update logo and branding

## Troubleshooting

### Firebase Issues
- Check config in `firebase-config.js`
- Verify services are enabled
- Check browser console for errors
- Ensure rules allow read/write access

### GitHub Pages Issues
- Wait 5-10 minutes for deployment
- Check all files are in root directory
- Verify branch and folder settings
- Check for typos in file names

### Checkout Issues
- Test WhatsApp number format
- Verify Formspree form ID
- Check email delivery
- Test on different devices

## Success Indicators

Your deployment is successful when:
- ✅ Website loads at GitHub Pages URL
- ✅ Admin can login and manage products
- ✅ Products display on storefront
- ✅ Cart and checkout work
- ✅ WhatsApp opens with order details
- ✅ Email orders send via Formspree
- ✅ Mobile design is responsive

## Support

Need help? Contact:
- WhatsApp: +234 9050120553
- Email: spanishfrenchexpress@gmail.com

Your professional e-commerce website is now live! 🎉