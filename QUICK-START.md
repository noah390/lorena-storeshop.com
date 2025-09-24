# 🚀 Quick Start Guide

## 1. Firebase Setup (5 minutes)

1. **Create Firebase Project**
   - Go to [console.firebase.google.com](https://console.firebase.google.com)
   - Create project: `lorena-store-prod`

2. **Enable Services**
   - Firestore Database (test mode)
   - Authentication (Email/Password)
   - Storage (test mode)

3. **Get Config**
   - Project Settings > Web app
   - Copy config to `js/firebase-config-prod.js`

4. **Create Admin**
   - Authentication > Add user
   - Email: `admin@lorenastore.com`

## 2. GitHub Deployment (3 minutes)

1. **Create Repository**
   ```bash
   # In project folder
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/lorena-store.git
   git push -u origin main
   ```

2. **Enable Pages**
   - Repository Settings > Pages
   - Source: Deploy from branch
   - Branch: `gh-pages`

## 3. Go Live! (2 minutes)

1. **Wait for deployment** (check Actions tab)
2. **Visit your site**: `https://yourusername.github.io/lorena-store`
3. **Test admin panel**: `/admin-firebase.html`

## 4. Make Updates

```bash
# Use the deploy script
deploy.bat

# Or manually
git add .
git commit -m "Your update message"
git push origin main
```

## 🎉 That's it!

Your e-commerce store is now live with:
- ✅ Firebase backend
- ✅ GitHub Pages hosting
- ✅ Automatic deployments
- ✅ Admin panel
- ✅ Image uploads
- ✅ Real-time updates

**Total setup time: ~10 minutes**