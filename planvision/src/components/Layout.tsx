// src/components/Layout.tsx
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import logoLight from "../assets/logoLight.png";

// ✅ Icon Imports
import { LayoutDashboard, Contact, Home, LogOut } from "lucide-react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [step, setStep] = useState(1); // Optional: ggf. über Context lösen

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

  const isCurrent = (path: string) => location.pathname === path;

  const handleNavigate = (path: string, disabled: boolean) => {
    if (!disabled) {
      navigate(path);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="flex flex-col justify-between bg-[#e8562a] w-80 p-6 fixed top-0 left-0 bottom-0">
        <div>
          <div className="mt-10 mb-16 cursor-pointer" onClick={() => navigate("/dashboard")}>
            <img src={logoLight} alt="Logo" className="h-12 mx-auto" />
          </div>

          <nav className="flex flex-col gap-6">
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
                  onClick={() => handleNavigate("/contacts/company", step < 1)}
                  disabled={step < 1}
                  className={`navbar-downlinks-button text-md rounded-md px-3 py-1 w-full text-left ${
                    step >= 1
                      ? isCurrent("/contacts/company")
                        ? "text-white font-semibold"
                        : "text-white/70 hover:text-white"
                      : "text-white/30 cursor-not-allowed"
                  }`}
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
        {children}
      </main>
    </div>
  );
};

export default Layout;
