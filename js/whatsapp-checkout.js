// WhatsApp Checkout System
const WHATSAPP_NUMBER = '2349050120553'; // Your WhatsApp business number

class WhatsAppCheckout {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart') || '{}');
        this.products = [];
    }

    async loadProducts() {
        try {
            this.products = await DemoFirebaseAPI.getProducts();
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    getCartItems() {
        const cartItems = [];
        let total = 0;

        Object.keys(this.cart).forEach(productId => {
            const product = this.products.find(p => p.id === productId);
            if (product) {
                const quantity = this.cart[productId];
                const itemTotal = product.price * quantity;
                cartItems.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                    total: itemTotal
                });
                total += itemTotal;
            }
        });

        return { items: cartItems, total };
    }

    generateOrderMessage(customerInfo, cartData) {
        const { items, total } = cartData;
        
        let message = `🛍️ *NEW ORDER FROM LORENA STORE*\n\n`;
        message += `👤 *Customer Details:*\n`;
        message += `Name: ${customerInfo.name}\n`;
        message += `Phone: ${customerInfo.phone}\n`;
        message += `Email: ${customerInfo.email}\n\n`;
        
        message += `📦 *Order Items:*\n`;
        items.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   Qty: ${item.quantity} × ₦${item.price.toLocaleString()}\n`;
            message += `   Subtotal: ₦${item.total.toLocaleString()}\n\n`;
        });
        
        message += `💰 *Total Amount: ₦${total.toLocaleString()}*\n\n`;
        message += `📅 Order Date: ${new Date().toLocaleDateString()}\n`;
        message += `🕐 Order Time: ${new Date().toLocaleTimeString()}\n\n`;
        message += `Please confirm this order and provide delivery details. Thank you! 🙏`;
        
        return message;
    }

    createWhatsAppLink(message) {
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    }

    processCheckout(customerInfo) {
        const cartData = this.getCartItems();
        
        if (cartData.items.length === 0) {
            throw new Error('Your cart is empty');
        }

        const orderMessage = this.generateOrderMessage(customerInfo, cartData);
        const whatsappLink = this.createWhatsAppLink(orderMessage);
        
        // Clear cart after successful checkout
        localStorage.removeItem('cart');
        
        return {
            whatsappLink,
            orderSummary: {
                customer: customerInfo,
                items: cartData.items,
                total: cartData.total,
                orderDate: new Date().toISOString()
            }
        };
    }
}

// Cart management functions
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
    cart[productId] = (cart[productId] || 0) + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showNotification('Product added to cart!');
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (cart[productId]) {
        cart[productId]--;
        if (cart[productId] <= 0) {
            delete cart[productId];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
    }
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize cart badge on page load
document.addEventListener('DOMContentLoaded', updateCartBadge);