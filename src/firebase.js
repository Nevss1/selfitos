  import { initializeApp } from "firebase/app";
  import { getAuth, GoogleAuthProvider } from "firebase/auth";
  import { getFirestore } from "firebase/firestore";
  
  const firebaseConfig = {
    apiKey: "AIzaSyAhED9jUqE2uRMsGE-0svbJtmAbQOM8-IY",
    authDomain: "selfitos-e6228.firebaseapp.com",
    projectId: "selfitos-e6228",
    storageBucket: "selfitos-e6228.firebasestorage.app",
    messagingSenderId: "111716002752",
    appId: "1:111716002752:web:3694ad454589ab90547625"
  };

  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);
  
  export { auth, provider, db };
  



