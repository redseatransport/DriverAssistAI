import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";

function Dashboard() {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{padding: "30px"}}>
      <h1>🚗 DriverAssist AI Dashboard</h1>

      <h3>Welcome</h3>

      <p>Email: {user?.email}</p>

      <p>Role: {user?.role}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
