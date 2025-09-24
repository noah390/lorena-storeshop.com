// Cart Functions for Checkout Integration
let cart = JSON.parse(localStorage.getItem('cart') || '{}');
let currentCheckoutMethod = '';

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
    currentCheckoutMethod = 'phone';
    showCheckoutModal();
}

function showCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'block';
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

// Handle checkout form submission
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const customerData = {
                name: document.getElementById('customer-name').value,
                phone: document.getElementById('customer-phone').value,
                email: document.getElementById('customer-email').value,
                address: document.getElementById('customer-address').value
            };
            
            // Calculate total with real product prices
            const cart = JSON.parse(localStorage.getItem('cart') || '{}');
            let total = 0;
            
            try {
                const snapshot = await firebase.database().ref('products').once('value');
                const products = snapshot.val() || [];
                
                Object.entries(cart).forEach(([id, qty]) => {
                    const product = products.find(p => p.id === parseInt(id));
                    if (product) {
                        total += qty * product.price;
                    }
                });
            } catch (error) {
                // Fallback calculation
                Object.entries(cart).forEach(([id, qty]) => {
                    total += qty * 5000;
                });
            }
            
            // Process checkout
            CheckoutManager.processCheckout(currentCheckoutMethod, customerData, cart, total);
        });
    }
});

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.querySelector('.overlay');
    
    if (cartSidebar.classList.contains('open')) {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('show');
    } else {
        cartSidebar.classList.add('open');
        overlay.classList.add('show');
        updateCartDisplay();
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const totalAmount = document.getElementById('total-amount');
    
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    
    if (Object.keys(cart).length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; padding: 2rem; color: #666;">Your cart is empty</div>';
        cartTotal.style.display = 'none';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = '';
    
    Object.entries(cart).forEach(([id, qty]) => {
        const itemPrice = 5000; // Simplified - should get from products
        total += qty * itemPrice;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="https://via.placeholder.com/60x60" alt="Product">
            <div class="cart-item-info">
                <div class="cart-item-name">Product ${id}</div>
                <div class="cart-item-price">₦${itemPrice.toLocaleString()}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${id}', -1)">-</button>
                    <span>${qty}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${id}', 1)">+</button>
                    <button onclick="removeFromCart('${id}')" style="margin-left: 1rem; color: #dc3545; background: none; border: none; cursor: pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    totalAmount.textContent = total.toLocaleString();
    cartTotal.style.display = 'block';
}

// Update quantity
function updateQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
    
    if (cart[id]) {
        cart[id] += change;
        if (cart[id] <= 0) {
            delete cart[id];
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Remove from cart
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
    delete cart[id];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Add to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
    cart[productId] = (cart[productId] || 0) + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show success message
    alert('Product added to cart!');
}