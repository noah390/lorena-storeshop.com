# Supabase E-commerce Setup Guide

## 1. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Wait for project to be ready

## 2. Database Setup
1. Go to SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `supabase-setup.sql`
3. Run the SQL commands to create tables and policies

## 3. Storage Setup
1. Go to Storage in your Supabase dashboard
2. The `product-images` bucket should be created automatically
3. If not, create it manually and make it public

## 4. Get API Credentials
1. Go to Settings > API in your Supabase dashboard
2. Copy your Project URL and anon/public key
3. Update `js/supabase-config.js` with your credentials:
   ```javascript
   const SUPABASE_URL = 'your-project-url-here';
   const SUPABASE_ANON_KEY = 'your-anon-key-here';
   ```

## 5. Admin User Setup
The SQL setup creates a default admin user:
- Email: `admin@lorenastore.com`
- Password: `admin123`

**IMPORTANT**: Change this password in production!

## 6. Test Locally
1. Open `index.html` in your browser
2. Products should load from Supabase
3. Test admin login at `admin.html`
4. Add/delete products in admin dashboard

## 7. Deploy to Production
1. Upload all files to your web hosting service
2. Ensure all HTML files can access the JS files
3. Test all functionality in production

## Features Implemented
- ✅ Products table with CRUD operations
- ✅ Admin authentication
- ✅ Image upload to Supabase Storage
- ✅ Secure admin panel
- ✅ Frontend integration
- ✅ Production-ready configuration

## Default Admin Credentials
- Email: admin@lorenastore.com
- Password: admin123

**Remember to change these in production!**