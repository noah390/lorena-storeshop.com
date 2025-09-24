// Authentication Guard - Protects pages from unauthorized access

// Pages that don't require authentication
const publicPages = ['index.html', 'login.html', 'register.html', 'admin.html', ''];

function checkAuth() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Allow access to public pages
    if (publicPages.includes(currentPage)) {
        return;
    }
    
    // Wait for Firebase to load
    const checkFirebase = () => {
        if (window.firebaseServices && window.firebaseServices.auth) {
            const { auth } = window.firebaseServices;
            
            // Check Firebase auth state
            auth.onAuthStateChanged((user) => {
                if (!user) {
                    // User not authenticated, redirect to login
                    window.location.href = 'login.html';
                }
            });
        } else {
            // Firebase not loaded yet, try again
            setTimeout(checkFirebase, 100);
        }
    };
    
    checkFirebase();
}

// Initialize auth guard when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAuth);
} else {
    checkAuth();
}