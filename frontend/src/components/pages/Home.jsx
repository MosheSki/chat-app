import MessagesContainer from "../shared/MessagesContainer";
import Sidebar from "../shared/Sidebar";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive"; // Import for responsive design handling

const Home = () => {
  const selectedConversation = useSelector(
    (store) => store.conversation.selectedConversation
  );

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }); // Adjust the max-width value as needed for your responsive design

  return (
    <div className="flex h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {/* On mobile, conditionally render Sidebar or MessagesContainer based on conversation selection */}
      {isMobile ? (
        !selectedConversation ? (
          <Sidebar />
        ) : (
          <div className="flex flex-1">
            <MessagesContainer />
          </div>
        )
      ) : (
        // On PC, always render Sidebar on the left and MessagesContainer on the right
        <>
          <Sidebar />
          <div className="flex flex-1">
            <MessagesContainer />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
