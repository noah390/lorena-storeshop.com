// Firebase configuration for Lorena Store
const firebaseConfig = {
    databaseURL: "https://lorena-store-9124a-default-rtdb.firebaseio.com/"
};

// Initialize Firebase (if not already initialized)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Set database rules to allow read/write (for development)
try {
    firebase.database().goOffline();
    firebase.database().goOnline();
} catch (e) {
    console.log('Firebase connection issue:', e);
}

const database = firebase.database();

// Firebase Products API
class FirebaseProductsAPI {
    // Get all products from Firebase
    static async getProducts() {
        try {
            const snapshot = await database.ref('products').once('value');
            const data = snapshot.val();
            if (data) {
                return Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
            }
            return [];
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    // Add product to Firebase
    static async addProduct(product) {
        try {
            const newProductRef = database.ref('products').push();
            await newProductRef.set({
                ...product,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            });
            return { id: newProductRef.key, ...product };
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    }

    // Update product in Firebase
    static async updateProduct(id, updates) {
        try {
            await database.ref(`products/${id}`).update({
                ...updates,
                updatedAt: firebase.database.ServerValue.TIMESTAMP
            });
            return { id, ...updates };
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }

    // Delete product from Firebase
    static async deleteProduct(id) {
        try {
            await database.ref(`products/${id}`).remove();
            return true;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }

    // Get single product by ID
    static async getProduct(id) {
        try {
            const snapshot = await database.ref(`products/${id}`).once('value');
            const data = snapshot.val();
            return data ? { id, ...data } : null;
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    }
}

// Export for use in other files
window.FirebaseProductsAPI = FirebaseProductsAPI;