// Real-time Product Management for Frontend
const RealtimeProducts = {
    // Load products from Firebase and display on homepage
    async loadAndDisplayProducts() {
        try {
            const snapshot = await firebase.database().ref('products').once('value');
            const products = snapshot.val() || [];
            
            const productsGrid = document.getElementById('products-grid');
            if (!productsGrid) return;
            
            if (products.length === 0) {
                productsGrid.innerHTML = '<div style="text-align: center; padding: 2rem; color: #666;">No products available</div>';
                return;
            }
            
            productsGrid.innerHTML = products.map(product => `
                <div style="background: white; border-radius: 15px; padding: 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;" onerror="this.src='https://via.placeholder.com/200x200?text=Product'">
                    <h3 style="margin-bottom: 0.5rem; color: #333;">${product.name}</h3>
                    <p style="color: #666; margin-bottom: 1rem; font-size: 0.9rem;">${product.description || 'Premium quality product'}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <span style="font-size: 1.5rem; font-weight: bold; color: #e75480;">₦${product.price?.toLocaleString()}</span>
                        <span style="background: #f8f9fa; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem; color: #666;">${product.category}</span>
                    </div>
                    <button onclick="addToCart(${product.id})" style="width: 100%; background: linear-gradient(135deg, #e75480, #ff6b9d); color: white; border: none; padding: 0.8rem; border-radius: 10px; font-size: 1rem; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='linear-gradient(135deg, #d63384, #e75480)'" onmouseout="this.style.background='linear-gradient(135deg, #e75480, #ff6b9d)'">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Failed to load products:', error);
            const productsGrid = document.getElementById('products-grid');
            if (productsGrid) {
                productsGrid.innerHTML = '<div style="text-align: center; padding: 2rem; color: #dc3545;">Failed to load products. Please refresh the page.</div>';
            }
        }
    },

    // Listen for real-time updates
    setupRealtimeListener() {
        firebase.database().ref('products').on('value', (snapshot) => {
            this.loadAndDisplayProducts();
        });
    }
};

// Initialize real-time products when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (typeof firebase !== 'undefined') {
        RealtimeProducts.loadAndDisplayProducts();
        RealtimeProducts.setupRealtimeListener();
    }
});