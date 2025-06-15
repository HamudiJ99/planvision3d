import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Wir haben dir eine E-Mail zum Zurücksetzen gesendet.");
    } catch (err: any) {
      setError("Fehler beim Versenden der E-Mail. Bitte überprüfe die Adresse.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md bg-white border p-6 sm:p-10 rounded-xl shadow-md">
        <div className="flex justify-center mb-12">
          <Link to="/login">
            <img src={logo} alt="Logo" className="h-14 sm:h-16 cursor-pointer" />
          </Link>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-[#e8562a]">
          Passwort vergessen?
        </h2>
        <p className="mb-6 text-center text-gray-700 text-sm sm:text-base">
          Du hast dein Passwort vergessen? Kein Problem! Gib einfach deine E-Mail-Adresse ein
          und wir senden dir eine E-Mail mit einem Link zum Zurücksetzen.
        </p>
        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-Mail-Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-md text-sm"
            required
          />
          <button
            type="submit"
            className="bg-[#e8562a] text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            Zurücksetzen
          </button>
          {message && <p className="text-green-600 text-center text-sm">{message}</p>}
          {error && <p className="text-red-600 text-center text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
