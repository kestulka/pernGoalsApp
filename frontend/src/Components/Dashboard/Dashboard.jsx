import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Features/authSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      console.error("No token found, redirecting to login");
      navigate("/login");
      return;
    }
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <nav className="flex justify-between items-center">
        <h2 className="text-4xl">Goaly </h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#242424] hover:border-blue-400 border-2 border-transparent rounded-full py-2 px-4 text-xl"
        >
          Log out <span>&rarr;</span>
        </button>
      </nav>
    </div>
  );
}

export default Dashboard;
