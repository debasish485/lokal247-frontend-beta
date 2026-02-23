// firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjmjl79G7Fmm5wcCnUkdBNikIcU-sorkw",
  authDomain: "lokal247-beta.firebaseapp.com",
  projectId: "lokal247-beta",
  storageBucket: "lokal247-beta.firebasestorage.app",
  messagingSenderId: "808123864370",
  appId: "1:808123864370:web:5887bbcf2801bbe3b3b32b"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export default app;
