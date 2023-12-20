import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCzLXXSgspdrQnYhAUtC4n4Pxt14ZgQndk",
  authDomain: "mmv-todoext.firebaseapp.com",
  projectId: "mmv-todoext",
  storageBucket: "mmv-todoext.appspot.com",
  messagingSenderId: "652738202589",
  appId: "1:652738202589:web:ca4b8dbf4618212e794434",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
