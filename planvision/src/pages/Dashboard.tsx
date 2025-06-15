import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Fehler beim Abmelden:", error);
    }
  };

  return (
    <div className="p-8 relative min-h-screen">
      <h1 className="text-2xl font-bold text-purple-600">Dashboard</h1>
      <p>Hier sieht der User später seine Inhalte.</p>

      <button
        onClick={handleLogout}
        className="absolute bottom-4 left-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Abmelden
      </button>
    </div>
  );
};

export default Dashboard;
