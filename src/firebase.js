import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "你的 API Key",
  authDomain: "你的 Firebase 項目 ID.firebaseapp.com",
  projectId: "你的 Firebase 項目 ID",
  storageBucket: "你的 Firebase 項目 ID.appspot.com",
  messagingSenderId: "你的 Sender ID",
  appId: "你的 App ID"
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
