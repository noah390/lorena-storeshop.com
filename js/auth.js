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
}

// Protect pages that require authentication
function protectPage() {
    const allowedPages = ['index.html', 'login.html', 'register.html', 'admin.html', 'admin_dashboard.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Allow access to home page and auth pages without login
    if (allowedPages.includes(currentPage)) {
        return true;
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
    
    const allowedPages = ['index.html', 'login.html', 'register.html', 'admin.html', 'admin_dashboard.html'];
    const targetPage = href.split('/').pop();
    
    if (!allowedPages.includes(targetPage) && !AuthManager.checkAuth()) {
        e.preventDefault();
        alert('Please login to access this page');
        window.location.href = 'login.html';
    }
});