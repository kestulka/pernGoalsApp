import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Features/authSlice";
import { setUsers, deleteUser } from "../../Features/usersSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (!token) {
      console.error("No token found, redirecting to login");
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(setUsers(data));
        } else {
          console.error("Failed to fetch users", response.statusText);
          if (response.status === 401) {
            dispatch(logout());
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [dispatch, navigate, token]);

  const handleUpdate = (id) => {
    console.log("Update user with id:", id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteUser(id));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

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
      <main>
        <ul>
          {users &&
            users.map((user) => (
              <li key={user.id} className="flex justify-between items-center">
                <span>{user.username}</span>
                <div>
                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="mr-2 bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
}

export default Dashboard;
