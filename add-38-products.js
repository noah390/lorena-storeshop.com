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
    {id: 8, name: "Silk Scarf Collection", price: 8000, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400", category: "Accessories"},
    {id: 9, name: "Business Blazer", price: 32000, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400", category: "Blazers"},
    {id: 10, name: "Vintage Leather Jacket", price: 45000, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", category: "Jackets"},
    {id: 11, name: "Floral Maxi Dress", price: 22000, image: "https://images.unsplash.com/photo-1566479179817-c0ae8e4b4b3d?w=400", category: "Dresses"},
    {id: 12, name: "Diamond Earrings", price: 18000, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400", category: "Jewelry"},
    {id: 13, name: "Crossbody Bag", price: 16000, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", category: "Bags"},
    {id: 14, name: "Ankle Boots", price: 26000, image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400", category: "Shoes"},
    {id: 15, name: "Wool Coat", price: 38000, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400", category: "Coats"},
    {id: 16, name: "Pearl Necklace", price: 14000, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400", category: "Jewelry"},
    {id: 17, name: "Denim Jeans", price: 19000, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", category: "Jeans"},
    {id: 18, name: "Silk Blouse", price: 21000, image: "https://images.unsplash.com/photo-1564257577-2d3b9c8b4b3d?w=400", category: "Tops"},
    {id: 19, name: "Platform Sandals", price: 17000, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400", category: "Shoes"},
    {id: 20, name: "Leather Belt", price: 9000, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", category: "Accessories"},
    {id: 21, name: "Cocktail Dress", price: 29000, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400", category: "Dresses"},
    {id: 22, name: "Tote Bag", price: 24000, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400", category: "Bags"},
    {id: 23, name: "Running Shoes", price: 25000, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", category: "Shoes"},
    {id: 24, name: "Silver Bracelet", price: 11000, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", category: "Jewelry"},
    {id: 25, name: "Cardigan Sweater", price: 20000, image: "https://images.unsplash.com/photo-1564257577-2d3b9c8b4b3d?w=400", category: "Sweaters"},
    {id: 26, name: "Mini Skirt", price: 13000, image: "https://images.unsplash.com/photo-1566479179817-c0ae8e4b4b3d?w=400", category: "Skirts"},
    {id: 27, name: "Clutch Purse", price: 15000, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", category: "Bags"},
    {id: 28, name: "Loafers", price: 23000, image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400", category: "Shoes"},
    {id: 29, name: "Trench Coat", price: 42000, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400", category: "Coats"},
    {id: 30, name: "Statement Ring", price: 7000, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400", category: "Jewelry"},
    {id: 31, name: "Palazzo Pants", price: 16000, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", category: "Pants"},
    {id: 32, name: "Crop Top", price: 12000, image: "https://images.unsplash.com/photo-1564257577-2d3b9c8b4b3d?w=400", category: "Tops"},
    {id: 33, name: "Ballet Flats", price: 18000, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400", category: "Shoes"},
    {id: 34, name: "Watch", price: 35000, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", category: "Accessories"},
    {id: 35, name: "Wrap Dress", price: 24000, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400", category: "Dresses"},
    {id: 36, name: "Backpack", price: 27000, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400", category: "Bags"},
    {id: 37, name: "Boots", price: 31000, image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400", category: "Shoes"},
    {id: 38, name: "Hair Accessories", price: 6000, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400", category: "Accessories"}
];

firebase.database().ref('products').set(products)
.then(() => console.log('✅ 38 products added successfully!'))
.catch(e => console.log('❌ Error:', e.message));