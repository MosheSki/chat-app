import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { setSelectedConversation } from "../../redux/conversationReducer";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search === "") {
      return toast.error("Please type a User name");
    }

    const conversation = conversations.find(
      (c) => c.fullName.toLowerCase().includes(search.toLowerCase()) //use this in validation
    );

    if (conversation) {
      dispatch(setSelectedConversation(conversation));
      setSearch("");
    } else {
      toast.error("This User is not found!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchInput;
