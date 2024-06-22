import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../redux/conversationReducer";

const Conversation = ({ conversation }) => {
  const selectedConversation = useSelector(
    (store) => store.conversation.selectedConversation
  );
  const dispatch = useDispatch();
  const isSelected = selectedConversation === conversation;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => dispatch(setSelectedConversation(conversation))}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img alt="user avatar" src={conversation.profilePic} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
