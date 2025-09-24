const firebaseConfig = {
    apiKey: "AIzaSyDSQ0LE6OgOlWBjFCSF8XuXRBjBqKVVMpE",
    authDomain: "lorena-store-9124a.firebaseapp.com",
    databaseURL: "https://lorena-store-9124a-default-rtdb.firebaseio.com/",
    projectId: "lorena-store-9124a"
};

firebase.initializeApp(firebaseConfig);

const products = [
    {id: 1, name: "Elegant Evening Dress", price: 25000, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400", category: "Dresses"},
    {id: 2, name: "Designer Leather Handbag", price: 35000, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400", category: "Bags"},
    {id: 3, name: "Luxury High Heels", price: 28000, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400", category: "Shoes"},
    {id: 4, name: "Gold Fashion Jewelry Set", price: 15000, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", category: "Jewelry"},
    {id: 5, name: "Casual Summer Dress", price: 18000, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400", category: "Dresses"},
    {id: 6, name: "Premium Sunglasses", price: 12000, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", category: "Accessories"},
    {id: 7, name: "Stylish Sneakers", price: 22000, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", category: "Shoes"},
    {id: 8, name: "Silk Scarf Collection", price: 8000, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400", category: "Accessories"}
];

firebase.database().ref('products').set(products)
.then(() => console.log('✅ Products populated successfully!'))
.catch(e => console.log('❌ Error:', e.message));