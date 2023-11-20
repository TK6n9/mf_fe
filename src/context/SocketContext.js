import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 이미 연결된 소켓이 있다면 닫습니다.
    if (socket) {
      socket.disconnect();
    }

    const newSocket = io(`${process.env.REACT_APP_LOCAL_PORT}`, {
      path: "/socket.io", // if your server serves Socket.IO on a different path
      transports: ["websocket", "polling"], // specify transports
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
      // other relevant options
    });

    // 연결 및 에러 이벤트 핸들러 설정
    newSocket.on("connect", () => {
      console.log("Socket Connected");
    });
    newSocket.on("disconnect", () => {
      console.log("Socket Disconnected");
    });
    newSocket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });

    setSocket(newSocket);
    console.log("🚀__newSocket", newSocket);

    // 컴포넌트 언마운트 시 소켓을 닫습니다.
    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
