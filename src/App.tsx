// App.ts
import { useState } from "react";
import "./App.scss";


const App: React.FC = () => {

  const sendData = async (code: number) => {
    try {
      const responce = await fetch("http://localhost:3001/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: code }),
      })
    
      if (responce.ok) {
        console.log(`Код ${code} отправлен`);
      }
    }
    catch(err) {
      console.log(err);
      alert("Сервер не отвечает");
    }
  };

  return (
    <div className="container">
      <h1>UART Test</h1>
      <button
        className="btn blue"
        onClick={() => {
          sendData(0x01);
        }}
      >
        Синий
      </button>

      <button
        className="btn green"
        onClick={() => {
          sendData(0x02);
        }}
      >
        Зелёный
      </button>

      <button
        className="btn red"
        onClick={() => {
          sendData(0x03);
        }}
      >
        Красный
      </button>
    </div>
  );
};

export default App;

