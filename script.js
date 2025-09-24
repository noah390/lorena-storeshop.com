// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || {};
let products = [];
let currentCheckoutMethod = '';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('admin.html')) {
        initializeAdmin();
    } else {
        initializeStore();
    }
});

// Store initialization
async function initializeStore() {
    try {
        await loadProducts();
        displayProducts();
        updateCartBadge();
        setupCartSidebar();
        trackUserSession();
    } catch (error) {
        console.error('Error initializing store:', error);
        loadDemoProducts();
    }
}

// Track user session for admin dashboard
function trackUserSession() {
    const { auth, db } = window.firebaseServices;
    if (!auth || !db) return;
    
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            try {
                // Update user session in Firestore with server timestamp
                await db.collection('userSessions').doc(user.uid).set({
                    userId: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                    isOnline: true,
                    userAgent: navigator.userAgent.substring(0, 100), // Limit length
                    currentPage: window.location.pathname.split('/').pop() || 'index.html'
                }, { merge: true });
            } catch (error) {
                console.error('Error tracking user session:', error);
            }
        }
    });
    
    // Update offline status when leaving (optimized)
    let isUpdatingOffline = false;
    const updateOfflineStatus = async () => {
        if (isUpdatingOffline) return;
        isUpdatingOffline = true;
        
        const user = auth.currentUser;
        if (user) {
            try {
                await db.collection('userSessions').doc(user.uid).update({
                    isOnline: false,
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (error) {
                console.error('Error updating offline status:', error);
            }
        }
    };
    
    window.addEventListener('beforeunload', updateOfflineStatus);
    window.addEventListener('pagehide', updateOfflineStatus);
}

// Load products from Firestore with live updates and caching
async function loadProducts() {
    try {
        // Check cache first for faster loading
        const cachedProducts = localStorage.getItem('liveProducts');
        const cacheTime = localStorage.getItem('productsCache');
        const now = Date.now();
        
        // Use cache if less than 5 minutes old
        if (cachedProducts && cacheTime && (now - parseInt(cacheTime)) < 300000) {
            products = JSON.parse(cachedProducts);
            displayProducts();
            return;
        }
        
        const { db } = window.firebaseServices;
        if (!db) {
            loadDemoProducts();
            return;
        }
        
        const snapshot = await db.collection('products').get();
        if (snapshot.empty) {
            // Initialize with demo data if no products exist
            await initializeDemoProducts();
            return;
        }
        
        products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        // Cache products with timestamp
        localStorage.setItem('liveProducts', JSON.stringify(products));
        localStorage.setItem('productsCache', now.toString());
        
    } catch (error) {
        console.error('Error loading products:', error);
        // Try to use cached data as fallback
        const cachedProducts = localStorage.getItem('liveProducts');
        if (cachedProducts) {
            products = JSON.parse(cachedProducts);
        } else {
            loadDemoProducts();
        }
    }
}

// Initialize demo products in Firebase with server timestamps
async function initializeDemoProducts() {
    const { db } = window.firebaseServices;
    const demoProducts = [
        {
            name: 'Elegant Dress',
            description: 'Beautiful elegant dress perfect for special occasions',
            price: 15000,
            imageURL: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            featured: true
        },
        {
            name: 'Designer Handbag',
            description: 'Premium leather handbag with modern design',
            price: 25000,
            imageURL: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            featured: true
        },
        {
            name: 'Fashion Jewelry',
            description: 'Stunning jewelry set with premium finish',
            price: 8000,
            imageURL: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            featured: true
        }
    ];
    
    try {
        // Use batch write for better performance
        const batch = db.batch();
        demoProducts.forEach(product => {
            const docRef = db.collection('products').doc();
            batch.set(docRef, product);
        });
        await batch.commit();
        
        // Clear cache and reload
        localStorage.removeItem('liveProducts');
        localStorage.removeItem('productsCache');
        await loadProducts();
    } catch (error) {
        console.error('Error initializing demo products:', error);
        loadDemoProducts();
    }
}

// Listen for live product updates
window.addEventListener('productsUpdated', (event) => {
    products = event.detail;
    displayProducts();
});

// Fallback demo products
function loadDemoProducts() {
    products = [
        {
            id: 'demo1',
            name: 'Elegant Dress',
            description: 'Beautiful elegant dress perfect for special occasions',
            price: 15000,
            imageURL: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'
        },
        {
            id: 'demo2',
            name: 'Designer Handbag',
            description: 'Premium leather handbag with modern design',
            price: 25000,
            imageURL: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'
        },
        {
            id: 'demo3',
            name: 'Fashion Jewelry',
            description: 'Stunning jewelry set with premium finish',
            price: 8000,
            imageURL: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'
        }
    ];
    displayProducts();
}

// Display products
function displayProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = '<div style="text-align: center; padding: 2rem; color: #666;">No products available</div>';
        return;
    }

    grid.innerHTML = products.map((product, index) => `
        <div style="background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden; transition: all 0.3s; border: 1px solid rgba(255,255,255,0.2); animation: fadeInUp 0.6s ease ${index * 0.1}s both;" onmouseover="this.style.transform='translateY(-10px) scale(1.02)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.1)'">
            <img src="${product.imageURL}" alt="${product.name}" 
                 style="width: 100%; height: 250px; object-fit: cover;"
                 onerror="this.src='https://via.placeholder.com/280x250/e75480/ffffff?text=Lorena+Store'">
            <div style="padding: 1.5rem;">
                <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 0.5rem; color: #333;">${product.name}</div>
                <div style="color: #666; margin-bottom: 1rem; font-size: 0.9rem; line-height: 1.5;">${product.description}</div>
                <div style="font-size: 1.4rem; font-weight: bold; background: linear-gradient(135deg, #e75480, #ff6b9d); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1rem;">₦${product.price.toLocaleString()}</div>
                <button onclick="addToCart('${product.id}')" 
                        style="width: 100%; background: linear-gradient(135deg, #e75480, #ff6b9d); color: white; border: none; padding: 1rem; border-radius: 25px; cursor: pointer; font-size: 1rem; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px rgba(231,84,128,0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(231,84,128,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(231,84,128,0.3)'">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    
    // Add CSS animation if not exists
    if (!document.getElementById('product-animations')) {
        const style = document.createElement('style');
        style.id = 'product-animations';
        style.textContent = `
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Cart functions
function addToCart(productId) {
    cart[productId] = (cart[productId] || 0) + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showNotification('Product added to cart!');
}

function removeFromCart(productId) {
    if (cart[productId]) {
        cart[productId]--;
        if (cart[productId] <= 0) {
            delete cart[productId];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        updateCartDisplay();
    }
}

function updateCartBadge() {
    const badge = document.getElementById('badge');
    if (badge) {
        const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
        badge.textContent = totalItems;
    }
}

function setupCartSidebar() {
    // Add click event to cart icon in header
    const cartIcon = document.querySelector('.addedToCart');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCart();
        });
    }
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
        
        if (sidebar.classList.contains('open')) {
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) return;

    const items = getCartItems();
    
    if (items.length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; padding: 2rem; color: #666;">Your cart is empty</div>';
        cartTotal.style.display = 'none';
        return;
    }
    
    cartItems.innerHTML = items.map(item => `
        <div class="cart-item">
            <img src="${item.imageURL}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₦${item.price.toLocaleString()}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="removeFromCart('${item.id}')">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="addToCart('${item.id}')">+</button>
                </div>
            </div>
            <div style="font-weight: bold;">₦${item.total.toLocaleString()}</div>
        </div>
    `).join('');
    
    const total = items.reduce((sum, item) => sum + item.total, 0);
    document.getElementById('total-amount').textContent = total.toLocaleString();
    cartTotal.style.display = 'block';
}

function getCartItems() {
    return Object.keys(cart).map(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
            const quantity = cart[productId];
            return {
                ...product,
                quantity,
                total: product.price * quantity
            };
        }
    }).filter(Boolean);
}

// Checkout functions
function checkoutWhatsApp() {
    currentCheckoutMethod = 'whatsapp';
    showCheckoutModal();
}

function checkoutEmail() {
    currentCheckoutMethod = 'email';
    showCheckoutModal();
}

function checkoutPhone() {
    window.location.href = 'tel:+2349050120553';
}

function showCheckoutModal() {
    const items = getCartItems();
    if (items.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    document.getElementById('checkout-modal').style.display = 'block';
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

// Handle checkout form submission
document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
});

async function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const email = document.getElementById('customer-email').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    
    if (!name || !phone || !email) {
        showNotification('Please fill in all required fields');
        return;
    }
    
    const items = getCartItems();
    const total = items.reduce((sum, item) => sum + item.total, 0);
    
    if (currentCheckoutMethod === 'whatsapp') {
        const message = generateWhatsAppMessage(name, phone, email, address, items, total);
        const whatsappUrl = `https://wa.me/2349050120553?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    } else if (currentCheckoutMethod === 'email') {
        await sendEmailOrder(name, phone, email, address, items, total);
    }
    
    // Clear cart and close modal
    cart = {};
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    updateCartDisplay();
    closeCheckoutModal();
    toggleCart();
    
    showNotification('Order sent successfully!');
}

function generateWhatsAppMessage(name, phone, email, address, items, total) {
    let message = `🛍️ *NEW ORDER FROM LORENA STORE*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${name}\n`;
    message += `Phone: ${phone}\n`;
    message += `Email: ${email}\n`;
    if (address) message += `Address: ${address}\n`;
    message += `\n📦 *Order Items:*\n`;
    
    items.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Qty: ${item.quantity} × ₦${item.price.toLocaleString()}\n`;
        message += `   Subtotal: ₦${item.total.toLocaleString()}\n\n`;
    });
    
    message += `💰 *Total Amount: ₦${total.toLocaleString()}*\n\n`;
    message += `📅 Order Date: ${new Date().toLocaleDateString()}\n`;
    message += `🕐 Order Time: ${new Date().toLocaleTimeString()}\n\n`;
    message += `Please confirm this order. Thank you! 🙏`;
    
    return message;
}

async function sendEmailOrder(name, phone, email, address, items, total) {
    const orderDetails = generateEmailOrderDetails(name, phone, email, address, items, total);
    
    // Fill Formspree form
    document.getElementById('form-name').value = name;
    document.getElementById('form-phone').value = phone;
    document.getElementById('form-email').value = email;
    document.getElementById('form-address').value = address;
    document.getElementById('form-order-details').value = orderDetails;
    
    // Submit form
    document.getElementById('formspree-form').submit();
}

function generateEmailOrderDetails(name, phone, email, address, items, total) {
    let details = `NEW ORDER FROM LORENA STORE\n\n`;
    details += `Customer: ${name}\n`;
    details += `Phone: ${phone}\n`;
    details += `Email: ${email}\n`;
    if (address) details += `Address: ${address}\n`;
    details += `\nOrder Items:\n`;
    
    items.forEach((item, index) => {
        details += `${index + 1}. ${item.name} - Qty: ${item.quantity} × ₦${item.price.toLocaleString()} = ₦${item.total.toLocaleString()}\n`;
    });
    
    details += `\nTotal: ₦${total.toLocaleString()}\n`;
    details += `Order Date: ${new Date().toLocaleString()}`;
    
    return details;
}

// Utility functions
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Admin functions
async function initializeAdmin() {
    // Check if admin is already logged in
    const adminUser = localStorage.getItem('adminUser');
    if (adminUser) {
        const admin = JSON.parse(adminUser);
        // Check if session is still valid (24 hours)
        if (Date.now() - admin.loginTime < 24 * 60 * 60 * 1000) {
            showAdminDashboard();
            loadAdminProducts();
            loadUsersData();
            setupRealtimeListeners();
            return;
        } else {
            localStorage.removeItem('adminUser');
        }
    }
    
    showLoginSection();
}

// Load users data for admin dashboard
async function loadUsersData() {
    try {
        const { db } = window.firebaseServices;
        
        // Get all users
        const usersSnapshot = await db.collection('users').get();
        const totalUsers = usersSnapshot.size;
        
        // Get online users (simplified - just count recent logins)
        const onlineUsers = 0; // Will be updated by real-time listener
        
        // Update stats
        const totalUsersEl = document.getElementById('total-users');
        const onlineUsersEl = document.getElementById('online-users');
        
        if (totalUsersEl) totalUsersEl.textContent = totalUsers;
        if (onlineUsersEl) onlineUsersEl.textContent = onlineUsers;
        
        // Display users list
        const usersList = document.getElementById('users-list');
        if (!usersList) return;
        
        if (usersSnapshot.empty) {
            usersList.innerHTML = '<p style="text-align: center; color: #666;">No users registered yet.</p>';
            return;
        }
        
        let usersHTML = '<div style="display: grid; gap: 1rem;">';
        usersSnapshot.forEach(doc => {
            const user = doc.data();
            usersHTML += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                    <div>
                        <strong>${user.name || 'Unknown'}</strong><br>
                        <small style="color: #666;">${user.email || 'No email'}</small><br>
                        <small style="color: #999;">Provider: ${user.provider || 'email'}</small>
                    </div>
                    <div style="text-align: right;">
                        <small style="color: #666;">Joined: ${user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown'}</small>
                    </div>
                </div>
            `;
        });
        usersHTML += '</div>';
        usersList.innerHTML = usersHTML;
        
    } catch (error) {
        console.error('Error loading users data:', error);
        const usersList = document.getElementById('users-list');
        if (usersList) {
            usersList.innerHTML = '<p style="text-align: center; color: #dc3545;">Error loading users data.</p>';
        }
    }
}

// Setup real-time listeners for live updates
function setupRealtimeListeners() {
    const { db } = window.firebaseServices;
    
    // Listen for product changes
    db.collection('products').onSnapshot((snapshot) => {
        products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        // Update admin products display
        displayAdminProducts();
        
        // Update live products for main site
        localStorage.setItem('liveProducts', JSON.stringify(products));
        window.dispatchEvent(new CustomEvent('productsUpdated', { detail: products }));
        
        // Update product count
        const totalProductsEl = document.getElementById('total-products');
        if (totalProductsEl) totalProductsEl.textContent = products.length;
    });
    
    // Listen for user changes
    db.collection('users').onSnapshot((snapshot) => {
        const totalUsersEl = document.getElementById('total-users');
        if (totalUsersEl) totalUsersEl.textContent = snapshot.size;
    });
    
    // Listen for online users
    db.collection('userSessions').where('isOnline', '==', true)
        .onSnapshot((snapshot) => {
            const onlineUsersEl = document.getElementById('online-users');
            if (onlineUsersEl) onlineUsersEl.textContent = snapshot.size;
        });
}

function showLoginSection() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('admin-dashboard').style.display = 'none';
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleAdminLogin);
    }
}

function showAdminDashboard() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
}

async function handleAdminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    const loginText = document.getElementById('login-text');
    const loginLoader = document.getElementById('login-loader');
    const messageEl = document.getElementById('login-message');
    
    loginText.style.display = 'none';
    loginLoader.style.display = 'inline';
    
    try {
        const { adminCredentials } = window.firebaseServices;
        
        // Check admin credentials
        if (adminCredentials[username] && adminCredentials[username] === password) {
            // Store admin session
            localStorage.setItem('adminUser', JSON.stringify({ username, loginTime: Date.now() }));
            messageEl.textContent = '';
            showAdminDashboard();
            loadAdminProducts();
            loadUsersData();
            setupRealtimeListeners();
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        messageEl.textContent = 'Invalid admin credentials';
        messageEl.className = 'message error';
    } finally {
        loginText.style.display = 'inline';
        loginLoader.style.display = 'none';
    }
}

async function signOut() {
    localStorage.removeItem('adminUser');
    showLoginSection();
}

async function loadAdminProducts() {
    try {
        const { db } = window.firebaseServices;
        const snapshot = await db.collection('products').get();
        products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        displayAdminProducts();
        updateProductStats();
        
        // Update live products
        localStorage.setItem('liveProducts', JSON.stringify(products));
        window.dispatchEvent(new CustomEvent('productsUpdated', { detail: products }));
    } catch (error) {
        console.error('Error loading admin products:', error);
    }
}

function displayAdminProducts() {
    const grid = document.getElementById('admin-products-grid');
    if (!grid) return;
    
    if (products.length === 0) {
        grid.innerHTML = '<div style="text-align: center; padding: 2rem; color: #666;">No products found</div>';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="admin-product-card">
            <img src="${product.imageURL}" alt="${product.name}" class="product-image"
                 onerror="this.src='https://via.placeholder.com/280x250/e75480/ffffff?text=No+Image'">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">₦${product.price.toLocaleString()}</div>
            </div>
            <div class="admin-product-actions">
                <button class="btn-edit" onclick="editProduct('${product.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete" onclick="deleteProduct('${product.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function updateProductStats() {
    const totalProducts = document.getElementById('total-products');
    if (totalProducts) {
        totalProducts.textContent = products.length;
    }
}

function showAddProductModal() {
    document.getElementById('modal-title').textContent = 'Add New Product';
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('image-preview').innerHTML = '';
    document.getElementById('product-modal').style.display = 'block';
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('modal-title').textContent = 'Edit Product';
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-price').value = product.price;
    
    const preview = document.getElementById('image-preview');
    preview.innerHTML = `<img src="${product.imageURL}" alt="Current image">`;
    
    document.getElementById('product-modal').style.display = 'block';
}

function closeProductModal() {
    document.getElementById('product-modal').style.display = 'none';
}

async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
        const { db } = window.firebaseServices;
        await db.collection('products').doc(productId).delete();
        showNotification('Product deleted successfully!');
        loadAdminProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
        showNotification('Failed to delete product');
    }
}

// Handle product form submission
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }
    
    const imageInput = document.getElementById('product-image');
    if (imageInput) {
        imageInput.addEventListener('change', handleImagePreview);
    }
});

function handleImagePreview(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('image-preview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
}

async function handleProductSubmit(e) {
    e.preventDefault();
    
    const saveText = document.getElementById('save-text');
    const saveLoader = document.getElementById('save-loader');
    
    saveText.style.display = 'none';
    saveLoader.style.display = 'inline';
    
    try {
        const productId = document.getElementById('product-id').value;
        const name = document.getElementById('product-name').value;
        const description = document.getElementById('product-description').value;
        const price = parseFloat(document.getElementById('product-price').value);
        const imageFile = document.getElementById('product-image').files[0];
        
        let imageURL = '';
        
        // Upload image if provided
        if (imageFile) {
            imageURL = await uploadImage(imageFile);
        } else if (productId) {
            // Keep existing image for edit
            const existingProduct = products.find(p => p.id === productId);
            imageURL = existingProduct ? existingProduct.imageURL : '';
        }
        
        const productData = { name, description, price, imageURL };
        const { db } = window.firebaseServices;
        
        if (productId) {
            // Update existing product
            await db.collection('products').doc(productId).update(productData);
            showNotification('Product updated successfully!');
        } else {
            // Add new product
            await db.collection('products').add(productData);
            showNotification('Product added successfully!');
        }
        
        closeProductModal();
        loadAdminProducts();
        
    } catch (error) {
        console.error('Error saving product:', error);
        showNotification('Failed to save product');
    } finally {
        saveText.style.display = 'inline';
        saveLoader.style.display = 'none';
    }
}

async function uploadImage(file) {
    const { storage } = window.firebaseServices;
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`products/${Date.now()}_${file.name}`);
    
    const snapshot = await imageRef.put(file);
    return await snapshot.ref.getDownloadURL();
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);