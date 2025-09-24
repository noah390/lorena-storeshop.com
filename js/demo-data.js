// Demo data for immediate functionality
const DEMO_PRODUCTS = [
  {
    id: '1',
    name: 'Elegant Summer Dress',
    description: 'Beautiful floral summer dress perfect for any occasion',
    price: 15000,
    imageURL: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Designer Handbag',
    description: 'Luxury leather handbag with gold accents',
    price: 25000,
    imageURL: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Pearl Necklace',
    description: 'Classic pearl necklace for elegant occasions',
    price: 12000,
    imageURL: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    id: '4',
    name: 'Casual T-Shirt',
    description: 'Comfortable cotton t-shirt in various colors',
    price: 5000,
    imageURL: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    createdAt: new Date()
  }
];

// Demo Firebase API that works without Firebase
const DemoFirebaseAPI = {
  async getProducts() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return DEMO_PRODUCTS;
  },

  async addProduct(product) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    DEMO_PRODUCTS.unshift(newProduct);
    return newProduct;
  },

  async updateProduct(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = DEMO_PRODUCTS.findIndex(p => p.id === id);
    if (index !== -1) {
      DEMO_PRODUCTS[index] = { ...DEMO_PRODUCTS[index], ...updates };
      return DEMO_PRODUCTS[index];
    }
    throw new Error('Product not found');
  },

  async deleteProduct(id) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = DEMO_PRODUCTS.findIndex(p => p.id === id);
    if (index !== -1) {
      DEMO_PRODUCTS.splice(index, 1);
      return true;
    }
    throw new Error('Product not found');
  },

  async loginAdmin(email, password) {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (email === 'admin@lorenastore.com' && password === 'admin123') {
      return { uid: 'demo-admin', email: email };
    }
    throw new Error('Invalid credentials');
  },

  async logoutAdmin() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  },

  getCurrentUser() {
    return localStorage.getItem('demoAdmin') ? { uid: 'demo-admin' } : null;
  },

  async uploadImage(file) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Return a placeholder image URL
    return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop';
  }
};

// Use demo API if Firebase is not available
window.FirebaseAPI = window.FirebaseAPI || DemoFirebaseAPI;