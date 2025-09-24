// User activity tracker for admin dashboard
import { auth, db } from '../firebase-config.js';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

// Track user login and activity
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            // Update user session in Firestore
            await setDoc(doc(db, 'userSessions', user.uid), {
                userId: user.uid,
                email: user.email,
                displayName: user.displayName,
                lastLogin: serverTimestamp(),
                isOnline: true,
                userAgent: navigator.userAgent,
                timestamp: new Date()
            }, { merge: true });
            
            // Track page visits
            trackPageVisit(user.uid);
            
        } catch (error) {
            console.error('Error tracking user session:', error);
        }
    }
});

// Track page visits
function trackPageVisit(userId) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    try {
        setDoc(doc(db, 'pageVisits', `${userId}_${Date.now()}`), {
            userId: userId,
            page: currentPage,
            timestamp: serverTimestamp(),
            url: window.location.href
        });
    } catch (error) {
        console.error('Error tracking page visit:', error);
    }
}

// Update user status to offline when leaving
window.addEventListener('beforeunload', async () => {
    const user = auth.currentUser;
    if (user) {
        try {
            await updateDoc(doc(db, 'userSessions', user.uid), {
                isOnline: false,
                lastSeen: serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating offline status:', error);
        }
    }
});