import { useState } from "react";
import { useAuth } from "../../context/AuthContext";


function Dashboard() {
  const [items,setItems]=useState({})
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <>
      dashboard
      <button onClick={handleLogout} className="border-2">
        Logout
      </button>
 

    </>
  );
}

export default Dashboard;
