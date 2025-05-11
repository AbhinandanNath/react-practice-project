import { useEffect, useState, useRef } from "react";

export default function useWebSocket(socketUrl) {
  const [messages, setMessages] = useState([]); // Store received messages
  const [isConnected, setIsConnected] = useState(false); // Connection status
  const socketRef = useRef(null); // WebSocket reference

  useEffect(() => {
    const socket = new WebSocket(socketUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      console.log("Web Socket Connected");
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("Web Socket Closed");
      socketRef.current = null;
    };

    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, [socketUrl]);

  const sendMessage = (msg) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    } else {
      console.error("WebSocket is not open");
    }
  };

  const closeConnection = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
    } else {
      console.error("WebSocket is not open");
    }
  }

  return { messages, isConnected, sendMessage, closeConnection };
}


