import { useNavigate } from "react-router-dom";
import logoLight from "../assets/logoLight.png";
import { LayoutDashboard, Contact, Home, LogOut } from "lucide-react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

type SidebarProps = {
  activePage: "dashboard" | "contacts";
  activeSubPage?: "firmendaten" | "team" | null;
};

const Sidebar = ({ activePage, activeSubPage }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Fehler beim Abmelden:", error);
    }
  };

  const handleNavigate = (path: string, disabled: boolean) => {
    if (!disabled) {
      navigate(path);
    }
  };

  return (
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
              activePage === "dashboard" ? "text-white font-semibold" : "text-white/70 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>

          {/* Kontaktdaten */}
          <div>
            <button
              disabled={false}
              onClick={() => handleNavigate("/firmendaten", false)}
              className={`navbar-button flex items-center gap-3 rounded-md text-xl w-full text-left ${
                activePage === "contacts" ? "text-white font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <Contact className="w-5 h-5" />
              Kontaktdaten
            </button>

            <div className="ml-8 mt-1 flex flex-col gap-1">
              <button
                onClick={() => handleNavigate("/firmendaten", false)}
                className={`navbar-downlinks-button text-md rounded-md px-3 py-1 w-full text-left ${
                  activePage === "contacts" && activeSubPage === "firmendaten"
                    ? "text-white font-semibold cursor-pointer"
                    : "text-white/70 hover:text-white cursor-pointer"
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
  );
};

export default Sidebar;
