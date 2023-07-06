import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";

// import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export function firestoreScores () {
    console.log('ICI FIRESTORE')

    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://support.google.com/firebase/answer/7015592  
    const firebaseConfig = {

        apiKey: "AIzaSyC1ylDui-VknEzL1qE5_jH4TIQAriAV4Wo",
    
        authDomain: "clrzzle-c5a09.firebaseapp.com",
    
        projectId: "clrzzle-c5a09",
    
        storageBucket: "clrzzle-c5a09.appspot.com",
    
        messagingSenderId: "775960808918",
    
        appId: "1:775960808918:web:ae6d80ffb8728e69442877",
    
        measurementId: "G-F4TETRT3TD"
    
      };
    

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);


    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    console.log('ICI db:', db)

}