import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from "../context/SocketContext";
import { useEffect } from "react";
import { setMessages } from "../redux/conversationReducer";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, selectedConversation } = useSelector(
    (store) => store.conversation
  );
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log("Received newMessage:", newMessage);
      console.log("Selected conversation ID:", selectedConversation._id);
      console.log("New message conversation ID:", newMessage.conversationId);
      if (
        selectedConversation._id.toString() ===
        newMessage.conversationId.toString()
      ) {
        console.log("Message matches selected conversation:", newMessage);
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        dispatch(setMessages([...messages, newMessage]));
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, dispatch, messages, selectedConversation]);
};

export default useListenMessages;
