// Populate Firebase with sample products
const sampleProducts = [
    {
        name: "Elegant Summer Dress",
        description: "Beautiful floral summer dress perfect for any occasion",
        price: 15000,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
        brand: "Lorena",
        category: "clothing",
        isAccessory: false,
        inStock: true
    },
    {
        name: "Designer Handbag",
        description: "Luxury leather handbag with gold accents",
        price: 25000,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
        brand: "Lorena",
        category: "accessories",
        isAccessory: true,
        inStock: true
    },
    {
        name: "Classic White Shirt",
        description: "Crisp white cotton shirt for professional look",
        price: 8000,
        image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400",
        brand: "Lorena",
        category: "clothing",
        isAccessory: false,
        inStock: true
    },
    {
        name: "Gold Chain Necklace",
        description: "18k gold plated chain necklace",
        price: 12000,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        brand: "Lorena",
        category: "jewelry",
        isAccessory: true,
        inStock: true
    },
    {
        name: "Denim Jeans",
        description: "High-quality denim jeans with perfect fit",
        price: 18000,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
        brand: "Lorena",
        category: "clothing",
        isAccessory: false,
        inStock: true
    },
    {
        name: "Leather Watch",
        description: "Premium leather strap watch with steel case",
        price: 35000,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400",
        brand: "Lorena",
        category: "watches",
        isAccessory: true,
        inStock: true
    },
    {
        name: "Silk Scarf",
        description: "Luxurious silk scarf with elegant patterns",
        price: 6000,
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400",
        brand: "Lorena",
        category: "accessories",
        isAccessory: true,
        inStock: true
    },
    {
        name: "Casual T-Shirt",
        description: "Comfortable cotton t-shirt for everyday wear",
        price: 5000,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        brand: "Lorena",
        category: "clothing",
        isAccessory: false,
        inStock: true
    }
];

// Function to populate Firebase
async function populateFirebase() {
    try {
        console.log('🔥 Starting Firebase population...');
        
        for (let i = 0; i < sampleProducts.length; i++) {
            const product = sampleProducts[i];
            await FirebaseProductsAPI.addProduct(product);
            console.log(`✅ Added: ${product.name}`);
        }
        
        console.log('🎉 Firebase populated successfully!');
        alert('✅ Firebase database populated with sample products!');
        
    } catch (error) {
        console.error('❌ Error populating Firebase:', error);
        alert('❌ Error populating Firebase: ' + error.message);
    }
}

// Auto-populate if Firebase is empty
async function checkAndPopulate() {
    try {
        const products = await FirebaseProductsAPI.getProducts();
        if (products.length === 0) {
            console.log('📦 Firebase is empty, populating with sample products...');
            await populateFirebase();
        } else {
            console.log(`📦 Firebase has ${products.length} products`);
        }
    } catch (error) {
        console.log('⚠️ Could not check Firebase, will populate manually');
    }
}

// Export functions
window.populateFirebase = populateFirebase;
window.checkAndPopulate = checkAndPopulate;