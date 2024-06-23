import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import { useContext } from "react";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io(
        "https://chat-app-tnjh.onrender.com" || "http://localhost:5000",
        {
          query: {
            userId: authUser._id,
          },
        }
      );

      setSocket(socket);

      //socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close(); //close socket when component unmount
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
