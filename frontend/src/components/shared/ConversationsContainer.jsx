import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const ConversationsContainer = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}

      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default ConversationsContainer;
