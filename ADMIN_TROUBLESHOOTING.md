# Admin Panel Troubleshooting Guide

## Issue: Customer Orders Not Showing in Admin Dashboard

### Quick Fix Steps:

1. **Start the Backend Server**
   - Double-click `start-backend.bat` in the E-CommerceWebsite folder
   - OR manually:
     - Open Command Prompt/Terminal
     - Navigate to: `E-CommerceWebsite/Backend/`
     - Run: `npm install` (first time only)
     - Run: `npm start`
   - Server should start on http://localhost:4000

2. **Check Server Connection**
   - Open admin dashboard
   - Look for connection status notifications
   - Green notification = Server connected
   - Red notification = Server not running

3. **View Orders**
   - If server is running: Orders will load automatically
   - If server is down: Click "Check Local Orders" button to see offline orders

### Common Issues:

**Problem**: "Failed to load orders" message
**Solution**: 
- Ensure backend server is running on port 4000
- Check if another application is using port 4000
- Try restarting the server

**Problem**: Orders placed but not showing
**Solution**:
- Check if orders.json file exists in Backend folder
- Verify server logs for any errors
- Use "Check Local Orders" feature as backup

**Problem**: Server won't start
**Solution**:
- Run `npm install` in Backend folder
- Check if Node.js is installed
- Ensure port 4000 is available

### Files to Check:
- `Backend/orders.json` - Contains all orders
- `Backend/server.js` - Main server file
- `Backend/package.json` - Dependencies

### Support:
If issues persist, check the browser console (F12) for error messages.