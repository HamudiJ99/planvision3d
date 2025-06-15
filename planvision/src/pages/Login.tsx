import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Erfolgreich eingeloggt");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <div className="border p-12 rounded-xl shadow-md bg-white">
        <div className="flex justify-center mb-16">
          <img src={logo} alt="Logo" className="h-16" />
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-Mail Adresse"
            className="border p-4 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Passwort"
            className="border p-4 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-left text-sm">
            <span
                onClick={() => navigate("/reset-password")}
                className="text-blue-600 hover:underline cursor-pointer"
            >
                Passwort vergessen?
            </span>
          </div>

            <button
            type="submit"
            style={{ backgroundColor: "#e8562a" }}
            className="text-white py-2 rounded-md hover:bg-[#fff]"
            >
            Anmelden
            </button>


          {error && <p className="text-red-600">{error}</p>}
        </form>

        <div className="text-center my-4 text-gray-500">oder</div>

        <button
            onClick={() => navigate("/register")}
            style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
            className="w-full text-gray-500 py-2 rounded hover:bg-gray-100 transition"
        >
            Neu Registrieren
        </button>
      </div>
    </div>
  );
};

export default Login;
