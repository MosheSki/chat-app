import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/conversationReducer";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, selectedConversation } = useSelector(
    (store) => store.conversation
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        dispatch(setMessages(data));
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, dispatch]);

  return { loading, messages };
};

export default useGetMessages;
