import { useState } from "react";
import { loginWithGoogle, logout } from "./firebase"; // 確保 Firebase 連接正確

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const loggedInUser = await loginWithGoogle();
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    } catch (error) {
      console.error("Google 登入失敗:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>設備借用系統</h1>

      {/* Google 登入按鈕 */}
      {user ? (
        <div>
          <p>歡迎，{user.displayName}</p>
          <button onClick={() => { logout(); setUser(null); }}>登出</button>
        </div>
      ) : (
        <button onClick={handleLogin}>使用 Google 登入</button>
      )}
    </div>
  );
}

export default App;
