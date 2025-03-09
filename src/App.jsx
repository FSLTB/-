import { useState } from "react";
import { loginWithGoogle, logout } from "./firebase"; // 引入 Firebase 登入功能

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const loggedInUser = await loginWithGoogle();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  };

  const [equipments, setEquipments] = useState([
    { id: 1, name: "攝影機", status: "可借用" },
    { id: 2, name: "投影機", status: "已借出" },
    { id: 3, name: "數位相機", status: "可借用" },
  ]);

  const handleBorrow = (id) => {
    const updatedEquipments = equipments.map((eq) =>
      eq.id === id && eq.status === "可借用" ? { ...eq, status: "已借出" } : eq
    );
    setEquipments(updatedEquipments);
    alert("借用成功！");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
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

      <ul>
        {equipments.map((eq) => (
          <li key={eq.id} style={{ marginBottom: "10px" }}>
            <strong>{eq.name}</strong> - {eq.status}{" "}
            <button
              onClick={() => handleBorrow(eq.id)}
              disabled={eq.status !== "可借用"}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                background: eq.status === "可借用" ? "blue" : "gray",
                color: "white",
                border: "none",
                cursor: eq.status === "可借用" ? "pointer" : "not-allowed",
              }}
            >
              借用
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
