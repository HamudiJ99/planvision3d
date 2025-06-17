import { useState } from "react";
import videoFile from "../../assets/video.mp4";

import Sidebar from "../../components/Sidebar";
import {
  ArrowRight,
  UserPlus,
  PlayCircle,
  Trash,

} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TeamMember {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projects: string[];
}

const Team = () => {
  const navigate = useNavigate();

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      firstName: "Max",
      lastName: "Mustermann",
      email: "kontakt@example.com",
      phone: "0123 4567890",
      projects: ["Projekt Alpha", "Projekt Beta"],
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [pendingInvites, setPendingInvites] = useState<TeamMember[]>([]);
  //const [showPending, setShowPending] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    project: "",
  });
/*
  const handleSave = (id: number) => {
    setEditingId(null);
  };
*/


  const handleAddUser = () => {
    if (!newUser.email.trim()) {
      alert("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }

    const newInvite: TeamMember = {
      id: Date.now(),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      projects: newUser.project ? [newUser.project] : [],
    };

    setPendingInvites([...pendingInvites, newInvite]);
    setNewUser({ firstName: "", lastName: "", email: "", phone: "", project: "" });
    setShowAddForm(false);
    alert("Einladung wurde versendet.");
  };

  const handleRemove = (id: number) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const handleBack = () => navigate("/firmendaten");
  const handleNext = () => navigate("/projekte");

 return (
    <div className="flex min-h-screen w-full">
      <Sidebar activePage="contacts" activeSubPage="team" />
      <main className="flex-1 p-10 ml-80 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#e8562a] mb-10">Team</h1>

        {/* Grid mit Teammitgliedern + Einladen-Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bestehende Mitglieder */}
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="border border-gray-300 rounded-xl p-6 bg-white shadow-sm cursor-pointer hover:border-[#e8562a] transition"
              onClick={() => setEditingId(member.id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full bg-[#e8562a] flex items-center justify-center text-white text-2xl font-semibold">
                  {member.firstName.charAt(0)}
                </div>
                <div className="flex-1">
                  {editingId === member.id ? (
                    <>
                      <input
                        value={member.firstName}
                        onChange={(e) =>
                          setTeamMembers((prev) =>
                            prev.map((m) =>
                              m.id === member.id ? { ...m, firstName: e.target.value } : m
                            )
                          )
                        }
                        className="w-full border rounded px-2 py-1 mb-2"
                      />
                      <input
                        value={member.lastName}
                        onChange={(e) =>
                          setTeamMembers((prev) =>
                            prev.map((m) =>
                              m.id === member.id ? { ...m, lastName: e.target.value } : m
                            )
                          )
                        }
                        className="w-full border rounded px-2 py-1 mb-2"
                      />
                      <input
                        value={member.email}
                        onChange={(e) =>
                          setTeamMembers((prev) =>
                            prev.map((m) =>
                              m.id === member.id ? { ...m, email: e.target.value } : m
                            )
                          )
                        }
                        className="w-full border rounded px-2 py-1 mb-2"
                      />
                      <input
                        value={member.phone}
                        onChange={(e) =>
                          setTeamMembers((prev) =>
                            prev.map((m) =>
                              m.id === member.id ? { ...m, phone: e.target.value } : m
                            )
                          )
                        }
                        className="w-full border rounded px-2 py-1 mb-2"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            //handleSave(member.id);
                          }}
                          className="bg-[#e8562a] text-white px-4 py-2 rounded hover:bg-[#cf3e17]"
                        >
                          Speichern
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(member.id);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-semibold">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-sm text-gray-600">{member.phone}</p>
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-1">Projekte:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {member.projects.map((project, idx) => (
                            <li key={idx}>{project}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Karte zum Hinzufügen eines neuen Mitglieds */}
          {!showAddForm && (
            <div
              onClick={() => setShowAddForm(true)}
              className="border-2 border-dashed border-gray-400 rounded-xl p-6 bg-white flex flex-col items-center justify-center cursor-pointer hover:border-[#e8562a] transition"
            >
              <UserPlus className="text-[#e8562a]" size={32} />
              <p className="mt-2 text-sm font-medium text-[#e8562a]">Mitglied einladen</p>
            </div>
          )}
        </div>

        {/* Formular als eigene Card */}
        {showAddForm && (
          <div className="mt-6 bg-gray-50 border border-gray-300 p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Neues Mitglied einladen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Vorname"
                value={newUser.firstName}
                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                className="border rounded px-3 py-2"
              />
              <input
                placeholder="Nachname"
                value={newUser.lastName}
                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                className="border rounded px-3 py-2"
              />
              <input
                placeholder="E-Mail"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="border rounded px-3 py-2"
              />
              <input
                placeholder="Telefon"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                className="border rounded px-3 py-2"
              />
              <input
                placeholder="Projekt"
                value={newUser.project}
                onChange={(e) => setNewUser({ ...newUser, project: e.target.value })}
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleAddUser}
                className="bg-[#e8562a] text-white px-4 py-2 rounded hover:bg-[#cf3e17]"
              >
                Einladung senden
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}

        {/* Ausstehende Einladungen */}
        {pendingInvites.length > 0 && (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Ausstehende Einladungen</h2>
            
            <div className="relative max-h-[600px] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[300px] overflow-y-auto pr-2">
                {pendingInvites.map((invite) => (
                <div
                    key={invite.id}
                    className="border border-dashed border-gray-400 rounded-xl p-4 bg-gray-50 text-gray-700"
                >
                    <p className="font-semibold">
                    {invite.firstName} {invite.lastName}
                    </p>
                    <p>{invite.email}</p>
                    <p className="text-sm text-gray-500">Wartet auf Bestätigung</p>
                </div>
                ))}
            </div>
            </div>
        </div>
        )}


        {/* Navigation */}
        <div className="mt-10 flex justify-between">
          <button onClick={handleBack} className="next-button text-[#e8562a] flex items-center gap-1">
            <ArrowRight className="rotate-180" size={20} /> Firmendaten
          </button>
          <button onClick={handleNext} className="next-button text-[#e8562a] flex items-center gap-1">
            Weiter <ArrowRight size={20} />
          </button>
        </div>

{/* Video-Popup */}
{showVideo && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
  <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center px-4">
    <button
      onClick={() => setShowVideo(false)}
      className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-400 transition"
    >
      ×
    </button>

    <video controls autoPlay className="w-full h-auto max-h-[80vh] rounded-md shadow-xl">
      <source src={videoFile} type="video/mp4" />
      Dein Browser unterstützt kein eingebettetes Video.
    </video>
  </div>
</div>

)}
{/* Video Button unten rechts */}
<div
  onClick={() => setShowVideo(true)}
  className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#e8562a] hover:bg-[#cf3e17] text-white px-4 py-3 rounded-full shadow-lg cursor-pointer group transition-all duration-300"
  title="Erklärvideo ansehen"
>
  <PlayCircle className="w-6 h-6" />
  <span
    className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-2 transition-all duration-300 text-sm font-medium"
  >
    Erklärvideo
  </span>
</div>
      </main>

      
    </div>

 
  );

  
};

export default Team;