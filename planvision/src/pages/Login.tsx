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
   <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md bg-white border p-6 sm:p-12 rounded-xl shadow-md">
        <div className="flex justify-center mb-10">
          <img src={logo} alt="Logo" className="h-14 sm:h-16" />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-Mail Adresse"
            className="border p-3 rounded-md text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Passwort"
            className="border p-3 rounded-md text-sm"
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
            className="text-white py-2 rounded-md hover:bg-white hover:border hover:border-[#e8562a] transition"
          >
            Anmelden
          </button>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>

        <div className="text-center my-4 text-gray-500 text-sm">oder</div>

        <button
          onClick={() => navigate("/register")}
          style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
          className="w-full text-gray-600 py-2 rounded hover:bg-gray-100 transition text-sm"
        >
          Neu Registrieren
        </button>
      </div>
    </div>
  );
};

export default Login;
