import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM6JC8DFiEvYlpgqhBL1AC0yA1NIFXwfA",
  authDomain: "uploadimage-411bd.firebaseapp.com",
  projectId: "uploadimage-411bd",
  storageBucket: "uploadimage-411bd.appspot.com",
  messagingSenderId: "1023051142248",
  appId: "1:1023051142248:web:6c91c34c3b97f5a085d7dd"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export default getStorage();

