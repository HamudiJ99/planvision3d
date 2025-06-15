import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: `${firstName} ${lastName}`,
        });
      }

      console.log("Registrierung erfolgreich:", userCredential.user);
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md bg-white border p-6 sm:p-12 rounded-xl shadow-md">
        <div className="flex justify-center mb-8">
          <Link to="/login">
            <img src={logo} alt="Logo" className="h-14 sm:h-16 cursor-pointer" />
          </Link>
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-700 mb-6">
          Neuen Account erstellen
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Vorname"
            className="border p-3 rounded-md text-sm"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nachname"
            className="border p-3 rounded-md text-sm"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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

          <button
            type="submit"
            style={{ backgroundColor: "#e8562a" }}
            className="text-white py-2 rounded-md hover:bg-white hover:border hover:border-[#e8562a] transition"
          >
            Registrieren
          </button>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>

        <button
          onClick={() => navigate("/login")}
          style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
          className="w-full text-gray-600 py-2 mt-6 rounded hover:bg-gray-100 transition text-sm"
        >
          Zurück zum Login
        </button>
      </div>
    </div>
  );
};

export default Register;
