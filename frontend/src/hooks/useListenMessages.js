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
      if (newMessage.conversationId === selectedConversation._id) {
        console.log("new message conversation id:" + newMessage.conversationId);
        console.log("conversation id:" + selectedConversation._id);
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
