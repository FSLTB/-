import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5z8QTILs5qQqk4qrOFcPH3XXOYqNppmg",
  authDomain: "barrow-system.firebaseapp.com",
  projectId: "barrow-system",
  storageBucket: "barrow-system.firebasestorage.app",
  messagingSenderId: "14273318132",
  appId: "1:14273318132:web:6553f3857f90a7f73062a1"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("登入成功", result.user);
    return result.user;
  } catch (error) {
    console.error("登入失敗", error);
    return null;
  }
};

const logout = async () => {
  await signOut(auth);
  console.log("已登出");
};

export { auth, loginWithGoogle, logout };
