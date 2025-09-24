// Auto-fix Firebase permissions
const firebaseConfig = {
    apiKey: "AIzaSyDSQ0LE6OgOlWBjFCSF8XuXRBjBqKVVMpE",
    authDomain: "lorena-store-9124a.firebaseapp.com",
    databaseURL: "https://lorena-store-9124a-default-rtdb.firebaseio.com/",
    projectId: "lorena-store-9124a"
};

// Load Firebase
const script1 = document.createElement('script');
script1.src = 'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js';
document.head.appendChild(script1);

script1.onload = () => {
    const script2 = document.createElement('script');
    script2.src = 'https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js';
    document.head.appendChild(script2);
    
    script2.onload = () => {
        firebase.initializeApp(firebaseConfig);
        
        // Test and populate
        const products = [
            {id: 1, name: "Elegant Dress", price: 15000, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"},
            {id: 2, name: "Designer Handbag", price: 25000, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"},
            {id: 3, name: "Stylish Shoes", price: 18000, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400"},
            {id: 4, name: "Fashion Jewelry", price: 8000, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"}
        ];
        
        firebase.database().ref('products').set(products)
        .then(() => console.log('✅ Firebase populated successfully'))
        .catch(e => console.log('❌ Still blocked:', e.message));
    };
};