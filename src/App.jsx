import { useState, useEffect } from "react";
import { loginWithGoogle, logout } from "./firebase"; // 確保 firebase.js 存在

function App() {
  const [user, setUser] = useState(null);
  const [equipments, setEquipments] = useState([
    { id: 1, name: "筆電", status: "可借用" },
    { id: 2, name: "投影機", status: "已借出" },
    { id: 3, name: "麥克風", status: "可借用" }
  ]);

  useEffect(() => {
    console.log("React 應用已載入");
  }, []);

  // Google 登入
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

  // 設備借用邏輯
  const handleBorrow = (id) => {
    const updatedEquipments = equipments.map(eq =>
      eq.id === id && eq.status === "可借用"
        ? { ...eq, status: "已借出" }
        : eq
    );
    setEquipments(updatedEquipments);
    alert("借用成功！");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>設備借用系統</h1>

      {/* Google 登入按鈕 */}
      {user ? (
        <div>
          <p>歡迎, {user.displayName}</p>
          <button onClick={() => { logout(); setUser(null); }}>登出</button>

          {/* 設備清單 */}
          <h2>設備列表</h2>
          <ul>
            {equipments.map((eq) => (
              <li key={eq.id}>
                <strong>{eq.name}</strong> - {eq.status}{" "}
                <button
                  onClick={() => handleBorrow(eq.id)}
                  disabled={eq.status !== "可借用"}
                >
                  借用
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button onClick={handleLogin}>使用 Google 登入</button>
      )}
    </div>
  );
}

export default App;
