import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";  
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

//add your credentials from firebase project
const firebaseConfig = {

    apiKey: "AIzaSyC1ylDui-VknEzL1qE5_jH4TIQAriAV4Wo",

    authDomain: "clrzzle-c5a09.firebaseapp.com",

    projectId: "clrzzle-c5a09",

    storageBucket: "clrzzle-c5a09.appspot.com",

    messagingSenderId: "775960808918",

    appId: "1:775960808918:web:ae6d80ffb8728e69442877",

    measurementId: "G-F4TETRT3TD"

  };


const app = initializeApp(firebaseConfig);
const db = getFirestore();

//create your custom method
export const getFirebaseScores = async () => {
    const querySnapshot = await getDocs(collection(db, "scores"));
    const firebaseScores = querySnapshot.docs.map((doc) => doc.data());
    console.log('Firebase Scores:', firebaseScores);
    return firebaseScores;
  };
  