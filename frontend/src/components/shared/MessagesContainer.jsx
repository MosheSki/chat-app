import { useSelector, useDispatch } from "react-redux";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
// import { useEffect } from "react";
import { setSelectedConversation } from "../../redux/conversationReducer";
import { useAuthContext } from "../../context/AuthContext";

const MessagesContainer = () => {
  const selectedConversation = useSelector(
    (store) => store.conversation.selectedConversation
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   //cleanup function (unmounts)
  //   return () => dispatch(setSelectedConversation(null));
  // }, [dispatch]);

  const handleClose = () => {
    // Remove selectedConversation from Redux store
    dispatch(setSelectedConversation(null));
  };

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center justify-between">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
            <div className="cursor-pointer ml-auto" onClick={handleClose}>
              ❌
            </div>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessagesContainer;
