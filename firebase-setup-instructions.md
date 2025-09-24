# Firebase OAuth Domain Authorization Fix

## Error: "This domain is not authorized for OAuth operations"

### Solution Steps:

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: `lorena-store-9124a`

2. **Navigate to Authentication**
   - Click "Authentication" in left sidebar
   - Click "Settings" tab
   - Click "Authorized domains"

3. **Add Your Domain**
   Add these domains to the authorized list:
   - `localhost` (for local testing)
   - `127.0.0.1` (for local testing)
   - Your actual domain when deployed (e.g., `yourdomain.com`)
   - If using GitHub Pages: `yourusername.github.io`

4. **For Local Development**
   Make sure these are added:
   - `localhost`
   - `127.0.0.1`

5. **Save Changes**
   - Click "Add domain" for each
   - Changes take effect immediately

### Alternative: Disable Google Login Temporarily

If you can't access Firebase Console, the code below removes Google login: