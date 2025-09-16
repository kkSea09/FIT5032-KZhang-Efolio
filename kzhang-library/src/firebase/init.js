// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATQhtHW7NMzj1eui7Vn8YpS_aCNnDHYJY",
    authDomain: "week7-kaizhang.firebaseapp.com",
    projectId: "week7-kaizhang",
    storageBucket: "week7-kaizhang.firebasestorage.app",
    messagingSenderId: "279637287819",
    appId: "1:279637287819:web:74c60180c22e2d436b858e"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
