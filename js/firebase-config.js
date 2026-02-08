// Firebase Configuration
// Keys provided by user (vara project)
const firebaseConfig = {
    apiKey: "AIzaSyCSfawE1qDbAx0YHekb-mfAPCFH3cDOUBk",
    authDomain: "vara-d0c90.firebaseapp.com",
    projectId: "vara-d0c90",
    storageBucket: "vara-d0c90.firebasestorage.app",
    messagingSenderId: "398716997311",
    appId: "1:398716997311:web:bfe6cc657d9e2da1cb000a",
    measurementId: "G-RHXTXLS372"
};

// Initialize Firebase
let app, auth, db, provider;

try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    provider = new firebase.auth.GoogleAuthProvider();

    // Expose to window for debugging and explicit global access
    window.auth = auth;
    window.db = db;
    window.provider = provider;

    // Enable analytics if available (optional)
    if (firebase.analytics) {
        firebase.analytics();
    }

    console.log("Firebase Initialized Successfully");
} catch (error) {
    console.error("Firebase Initialization Error:", error);
    alert("Firebase failed to initialize. Check console for details.");
}
