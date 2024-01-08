import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBot33_u5OARaSbIhGA-mWuKhBeqCg9U_A",
  authDomain: "netflix-clone-portfolio-10af9.firebaseapp.com",
  projectId: "netflix-clone-portfolio-10af9",
  storageBucket: "netflix-clone-portfolio-10af9.appspot.com",
  messagingSenderId: "326650873068",
  appId: "1:326650873068:web:d3b175199d8c6629f611c9",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;
