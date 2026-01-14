import React from "react";

const App: React.FC = () => {
  const sendValue = async () => {
    try {
      const response = await fetch("http://localhost:3001/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const text = await response.text();
      //alert(text); // покажет результат
    } catch (err) {
      console.error(err);
      alert("Ошибка при отправке");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>UART Test</h1>
      <button
        onClick={sendValue}
        style={{ fontSize: "18px", padding: "10px 20px", marginTop: "20px" }}
      >
        Отправить число
      </button>
    </div>
  );
};

export default App
