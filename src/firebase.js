import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUIwWxhTcywBp9pMrTUwRGBHOulVVqT1w",
  authDomain: "movieapp-g-1627.firebaseapp.com",
  projectId: "movieapp-g-1627",
  storageBucket: "movieapp-g-1627.appspot.com",
  messagingSenderId: "114337438781",
  appId: "1:114337438781:web:a92fa7720465d3a9605e54",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;
