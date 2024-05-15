import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  // log outinimo funkcija dedu cia, nes paprasciau su navigate nei window.location back'e
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, redirecting to login");
        navigate("/login");
        return;
      }
      try {
        const response = await fetch("/api/goals", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setGoals(data);
        } else {
          console.error("Failed to fetch goals:", response.statusText);
          // unauthorized redirect
          if (response.status === 401) {
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchGoals();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
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
        {goals.map((goal) => (
          <div key={goal.id}>{goal.goal_description}</div>
        ))}
      </main>
    </div>
  );
}

export default MainPage;
