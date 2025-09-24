// Authentication middleware for protecting pages
class AuthManager {
    static checkAuth() {
        const currentUser = localStorage.getItem('currentUser');
        return currentUser ? JSON.parse(currentUser) : null;
    }
    
    static requireAuth() {
        const user = this.checkAuth();
        if (!user) {
            alert('Please login to access this page');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
    
    static redirectIfLoggedIn() {
        const user = this.checkAuth();
        if (user) {
            window.location.href = 'profile.html';
            return true;
        }
        return false;
    }
    
    static logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    }
    
    // Register user with simple sync
    static async registerUser(name, identifier, password) {
        return await SimpleUsersAPI.registerUser(name, identifier, password);
    }
    
    // Login user with simple sync
    static async loginUser(identifier, password) {
        return await SimpleUsersAPI.loginUser(identifier, password);
    }
}

// Protect pages that require authentication
function protectPage() {
    const allowedPages = ['index.html', 'login.html', 'register.html', 'admin-login.html', 'admin-dashboard.html', 'forgot-password.html', 'verify-access.html', ''];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Allow access to home page and auth pages without login
    if (allowedPages.includes(currentPage) || currentPage === '') {
        return true;
    }
    
    // Check if access verification is required
    const accessVerified = localStorage.getItem('accessVerified');
    if (!accessVerified || Date.now() > parseInt(accessVerified)) {
        // Require verification for sensitive pages
        if (currentPage === 'profile.html' || currentPage.includes('admin')) {
            window.location.href = `verify-access.html?redirect=${currentPage}`;
            return false;
        }
    }
    
    // All other pages require authentication
    return AuthManager.requireAuth();
}

// Run protection check on page load
document.addEventListener('DOMContentLoaded', function() {
    protectPage();
});

// Add auth protection to all links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    
    const allowedPages = ['index.html', 'login.html', 'register.html', 'admin-login.html', 'admin-dashboard.html', 'forgot-password.html', 'verify-access.html'];
    const targetPage = href.split('/').pop();
    
    if (!allowedPages.includes(targetPage) && !AuthManager.checkAuth()) {
        e.preventDefault();
        alert('Please login to access this page');
        window.location.href = 'login.html';
    }
});