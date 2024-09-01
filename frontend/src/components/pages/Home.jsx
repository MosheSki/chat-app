import MessagesContainer from "../shared/MessagesContainer";
import Sidebar from "../shared/Sidebar";

const Home = () => {
  return (
    <div className="flex h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <div className="hidden md:flex">
        <MessagesContainer />
      </div>
    </div>
  );
};

export default Home;
