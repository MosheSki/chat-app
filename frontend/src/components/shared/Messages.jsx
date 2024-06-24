import { useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import { useEffect } from "react";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behaivor: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && (
        <>
          <div className="flex gap-3 items-center">
            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-1">
              <div className="skeleton h-4 w-40"></div>
              <div className="skeleton h-4 w-40"></div>
            </div>
          </div>
          <div className="flex gap-3 items-center justify-end">
            <div className="flex flex-col gap-1">
              <div className="skeleton h-4 w-40"></div>
            </div>
            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
          </div>
        </>
      )}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a Message to start the Conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
