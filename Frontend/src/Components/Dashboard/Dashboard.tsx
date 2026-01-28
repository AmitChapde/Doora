import { useAuth } from "../../features/auth/context/AuthContext";

function Dashboard() {
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
