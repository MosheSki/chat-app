import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();

  return (
    <div className="mt-auto flex items-center justify-between">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
      <div className="sm:text-lg md:text-xl text-gray-200 font-semibold">
        🟢 {authUser.fullName}
      </div>
    </div>
  );
};

export default LogoutButton;
