// Firebase Users API - Fixed for domain issues
const firebaseConfig = {
    apiKey: "AIzaSyDSQ0LE6OgOlWBjFCSF8XuXRBjBqKVVMpE",
    authDomain: "lorena-store-9124a.firebaseapp.com",
    databaseURL: "https://lorena-store-9124a-default-rtdb.firebaseio.com/",
    projectId: "lorena-store-9124a"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const FirebaseUsersAPI = {
    // Register new user
    async registerUser(userData) {
        try {
            const userId = userData.email || userData.phone;
            const userKey = userId.replace(/[.#$\[\]@]/g, '_');
            const user = {
                ...userData,
                id: userId,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                isActive: true
            };
            
            await firebase.database().ref(`users/${userKey}`).set(user);
            
            const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
            localUsers[userId] = user;
            localStorage.setItem('registeredUsers', JSON.stringify(localUsers));
            
            return user;
        } catch (error) {
            console.log('Firebase error, using localStorage fallback');
            throw error;
        }
    },

    // Login user
    async loginUser(identifier, password) {
        try {
            const userKey = identifier.replace(/[.#$\[\]@]/g, '_');
            const userRef = await firebase.database().ref(`users/${userKey}`).once('value');
            const user = userRef.val();
            
            if (!user || user.password !== password) {
                throw new Error('Invalid credentials');
            }
            
            await firebase.database().ref(`users/${userKey}/lastLogin`).set(new Date().toISOString());
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
            
            return user;
        } catch (error) {
            throw error;
        }
    },

    // Get all users
    async getAllUsers() {
        try {
            const snapshot = await firebase.database().ref('users').once('value');
            const users = snapshot.val() || {};
            return Object.values(users);
        } catch (error) {
            return [];
        }
    },

    // Check if user exists
    async userExists(identifier) {
        try {
            const userKey = identifier.replace(/[.#$\[\]@]/g, '_');
            const userRef = await firebase.database().ref(`users/${userKey}`).once('value');
            return userRef.exists();
        } catch (error) {
            return false;
        }
    }
};