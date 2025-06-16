import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import logoLight from "../assets/logoLight.png";
import videoFile from "../assets/video.mp4";

// ✅ Icons
import { ArrowRight, LayoutDashboard, Contact, Home, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [step, setStep] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fullName = user.displayName || "User";
        const [first, ...rest] = fullName.split(" ");
        setFirstName(first);
        setLastName(rest.join(" "));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Fehler beim Abmelden:", error);
    }
  };

  const currentPath = window.location.pathname;
  const handleNavigate = (path: string, disabled: boolean) => {
    if (!disabled) {
      navigate(path);
    }
  };
  const isCurrent = (path: string) => currentPath === path;

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="flex flex-col justify-between bg-[#e8562a] w-80 p-6 fixed top-0 left-0 bottom-0">
        <div>
          <div className="mt-10 mb-16 cursor-pointer" onClick={() => navigate("/dashboard")}>
            <img src={logoLight} alt="Logo" className="h-12 mx-auto" />
          </div>

          <nav className="flex flex-col gap-6">
            {/* Dashboard */}
            <button
              onClick={() => handleNavigate("/dashboard", false)}
              className={`navbar-button flex items-center gap-3 rounded-md transition-colors text-xl w-full text-left ${
                isCurrent("/dashboard") ? "text-white font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </button>

            {/* Kontaktdaten */}
            <div>
              <button
                disabled
                className="navbar-button flex items-center gap-3 rounded-md text-xl w-full text-left text-white/30 cursor-not-allowed"
              >
                <Contact className="w-5 h-5" />
                Kontaktdaten
              </button>

              <div className="ml-8 mt-1 flex flex-col gap-1">
                <button
                  disabled
                  className="navbar-downlinks-button text-md rounded-md px-3 py-1 w-full text-left text-white/30 cursor-not-allowed"
                >
                  Firmendaten
                </button>
                <button
                  disabled
                  className="navbar-downlinks-button text-md rounded-md px-3 py-1 w-full text-left text-white/30 cursor-not-allowed"
                >
                  Team
                </button>
              </div>
            </div>

            {/* Projekte */}
            <div>
              <button
                disabled
                className="navbar-button flex items-center gap-3 rounded-md text-xl w-full text-left text-white/30 cursor-not-allowed"
              >
                <Home className="w-5 h-5" />
                Projekte
              </button>

              <div className="ml-8 mt-1 flex flex-col gap-1">
                <button disabled className="navbar-downlinks-button text-white/30 text-md text-left cursor-not-allowed">
                  Geplante Projekte
                </button>
                <button disabled className="navbar-downlinks-button text-white/30 text-md text-left cursor-not-allowed">
                  Aktuelle Projekte
                </button>
                <button disabled className="navbar-downlinks-button text-white/30 text-md text-left cursor-not-allowed">
                  Abgeschlossene Projekte
                </button>
              </div>
            </div>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="navbar-button flex items-center gap-3 text-left text-white hover:text-white/80 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Abmelden
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 ml-80">
        <h1 className="text-3xl font-bold text-[#e8562a] mb-4">
          Hallo {firstName} {lastName}
        </h1>
        <p className="mb-6 text-[#cc4823] max-w-xl">
          Willkommen im Dashboard. Bitte sieh dir zuerst das Einführungsvideo an.
        </p>

        <div className="mb-6 max-w-xl">
          <video src={videoFile} controls className="w-full rounded-lg" />
          {step === 0 && (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setStep(1);
                  navigate("/firmendaten");
                }}
                className="next-button flex items-center gap-2 bg-[#e8562a] text-white px-5 py-2 rounded-md hover:bg-[#cf3e17] transition"
              >
                Weiter
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <p className="text-[#b5401e] max-w-xl">
          Sobald du auf "Weiter" klickst, kannst du deine Firmendaten eingeben.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
