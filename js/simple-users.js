// Simple Users API - No Auth, Direct Database Only
const firebaseConfig = {
    apiKey: "AIzaSyDSQ0LE6OgOlWBjFCSF8XuXRBjBqKVVMpE",
    databaseURL: "https://lorena-store-9124a-default-rtdb.firebaseio.com/",
    projectId: "lorena-store-9124a"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const SimpleUsersAPI = {
    // Register user - localStorage first, Firebase second
    async registerUser(name, identifier, password) {
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        
        if (users[identifier]) {
            throw new Error('User already exists');
        }
        
        const user = {
            name: name,
            password: password,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };
        
        // Save to localStorage first
        users[identifier] = user;
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        // Try to sync to Firebase (optional)
        try {
            const userKey = identifier.replace(/[.#$[\]@]/g, '_');
            await firebase.database().ref(`users/${userKey}`).set({
                ...user,
                id: identifier
            });
        } catch (error) {
            console.log('Firebase sync failed, continuing with localStorage');
        }
        
        return user;
    },

    // Login user
    async loginUser(identifier, password) {
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        
        if (!users[identifier] || users[identifier].password !== password) {
            throw new Error('Invalid credentials');
        }
        
        // Update last login
        users[identifier].lastLogin = new Date().toISOString();
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[identifier]));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Try to sync to Firebase (optional)
        try {
            const userKey = identifier.replace(/[.#$[\]@]/g, '_');
            await firebase.database().ref(`users/${userKey}/lastLogin`).set(new Date().toISOString());
        } catch (error) {
            console.log('Firebase sync failed, continuing with localStorage');
        }
        
        return users[identifier];
    },

    // Get all users for admin
    async getAllUsers() {
        const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        
        try {
            const snapshot = await firebase.database().ref('users').once('value');
            const firebaseUsers = snapshot.val() || {};
            
            // Merge Firebase and localStorage users
            const allUsers = [];
            Object.entries(localUsers).forEach(([id, user]) => {
                allUsers.push({ ...user, id });
            });
            
            Object.values(firebaseUsers).forEach(user => {
                if (!localUsers[user.id]) {
                    allUsers.push(user);
                }
            });
            
            return allUsers;
        } catch (error) {
            // Return localStorage users only
            return Object.entries(localUsers).map(([id, user]) => ({ ...user, id }));
        }
    }
};