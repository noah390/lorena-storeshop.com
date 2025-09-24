// Firebase Configuration - Compatible with both v8 and v9
const firebaseConfig = {
  apiKey: "AIzaSyC2v-EcQMh5spERMxiMK8RixAIhbkJRPVI",
  authDomain: "lorena-store-9124a.firebaseapp.com",
  projectId: "lorena-store-9124a",
  storageBucket: "lorena-store-9124a.firebasestorage.app",
  messagingSenderId: "148425862216",
  appId: "1:148425862216:web:2f988671359409f1a93c7d",
  measurementId: "G-34NW6BRXH7"
};

// Initialize Firebase (v8 compat)
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Admin credentials
const adminCredentials = {
  'Lorena': 'Iloveyoudear',
  'Admin01': 'Admin12345'
};

// Export services for use in other files
window.firebaseServices = { db, auth, storage, googleProvider, adminCredentials };

console.log('Firebase initialized successfully');