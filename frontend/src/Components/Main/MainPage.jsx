import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  // log outinimo funkcija dedu cia, nes paprasciau su navigate nei window.location back'e
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("login");
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

export default MainPage;
