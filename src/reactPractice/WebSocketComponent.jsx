import {useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
export default function WebSocketComponent (){
    const { messages, isConnected, sendMessage, closeConnection } = useWebSocket(
      "wss://echo.websocket.events"  // This server will echo back any message you send.
    );
    const [input, setInput] = useState("");
  
    const handleSend = () => {
      sendMessage(input);
      setInput("");
    };

    function handleCloseConnection() {
        closeConnection();
    }
  
    return (
      <div>
        <h1>WebSocket Connection</h1>
        <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSend} disabled={!isConnected}>
          Send
        </button>
        <button onClick={handleCloseConnection} disabled={!isConnected}>
          Close Connection
        </button>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li style={{color: 'black'}} key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    );
  };