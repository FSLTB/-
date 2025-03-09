import { useState, useEffect } from "react";
import { loginWithGoogle, logout } from "./firebase"; // 確保 firebase.js 存在

function App() {
  const [user, setUser] = useState(null);
  const [equipments, setEquipments] = useState([
    { id: 1, name: "筆記型電腦", status: "可借用" },
    { id: 2, name: "投影機", status: "已借出" },
    { id: 3, name: "麥克風", status: "可借用" }
  ]);

  useEffect(() => {
    console.log("✅ React 應用已載入");
  }, []);

  const handleLogin = async () => {
    const loggedInUser = await loginWithGoogle();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const handleBorrow = (id) => {
    setEquipments((prevEquipments) =>
      prevEquipments.map((eq) =>
        eq.id === id && eq.status === "可借用"
          ? { ...eq, status: "已借出" }
          : eq
      )
    );
    console.log(`✅ 設備 ${id} 已借出`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>📌 設備借用系統</h1>

      {user ? (
        <div>
          <p>歡迎, {user.displayName}</p>
          <button onClick={handleLogout}>登出</button>
          <h2>📋 設備列表</h2>
          <ul>
            {equipments.map((eq) => (
              <li key={eq.id} style={{ marginBottom: "10px" }}>
                <strong>{eq.name}</strong> - {eq.status}
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
      ) : (
        <button onClick={handleLogin}>使用 Google 登入</button>
      )}
    </div>
  );
}

export default App;
