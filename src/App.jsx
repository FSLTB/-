import { useState } from "react";

function App() {
  const [equipments, setEquipments] = useState([
    { id: 1, name: "筆記型電腦", status: "可借用" },
    { id: 2, name: "投影機", status: "已借出" },
    { id: 3, name: "數位相機", status: "可借用" },
  ]);

  const handleBorrow = (id) => {
    const updatedEquipments = equipments.map((eq) =>
      eq.id === id && eq.status === "可借用"
        ? { ...eq, status: "已借出" }
        : eq
    );
    setEquipments(updatedEquipments);
    alert("借用成功！");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📌 設備借用系統</h1>
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
