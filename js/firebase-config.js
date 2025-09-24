// Development Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGpF5_XQJ8QJ5_XQJ8QJ5_XQJ8QJ5_XQJ8",
  authDomain: "lorena-store-demo.firebaseapp.com",
  projectId: "lorena-store-demo",
  storageBucket: "lorena-store-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:demo123456789"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Firebase API wrapper
const FirebaseAPI = {
  // Products
  async getProducts() {
    const snapshot = await db.collection('products').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async addProduct(product) {
    const docRef = await db.collection('products').add({
      ...product,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return { id: docRef.id, ...product };
  },

  async updateProduct(id, product) {
    await db.collection('products').doc(id).update(product);
    return { id, ...product };
  },

  async deleteProduct(id) {
    await db.collection('products').doc(id).delete();
  },

  // Authentication
  async loginAdmin(email, password) {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  },

  async logoutAdmin() {
    await auth.signOut();
  },

  getCurrentUser() {
    return auth.currentUser;
  },

  // Storage
  async uploadImage(file) {
    const fileName = `products/${Date.now()}_${file.name}`;
    const storageRef = storage.ref(fileName);
    const snapshot = await storageRef.put(file);
    return await snapshot.ref.getDownloadURL();
  }
};