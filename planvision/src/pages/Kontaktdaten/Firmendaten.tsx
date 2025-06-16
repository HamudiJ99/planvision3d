import { useState, useEffect  } from "react";
import Sidebar from "../../components/Sidebar";
import videoFile from "../../assets/video.mp4";
import {
  ArrowRight,
  PlayCircle,
  UploadCloud,
  Building2,
  MapPin,
  Globe,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Firebase Einrichtung:
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../../firebase"; // dein Firebase-Pfad
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";



const Firmendaten = () => {
  const navigate = useNavigate();

  const maxFileSize = 2 * 1024 * 1024; // 2MB

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [firma, setFirma] = useState("");
  const [anschrift, setAnschrift] = useState("");
  const [adresse, setAdresse] = useState("");
  const [land, setLand] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);


// Daten laden beim Öffnen der Seite



useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) return;

    const docRef = doc(db, "firmen", user.uid);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      setFirma(data.firma || "");
      setAnschrift(data.anschrift || "");
      setAdresse(data.adresse || "");
      setLand(data.land || "");
      if (data.logoUrl) setLogoPreview(data.logoUrl);
    }
  });

  return () => unsubscribe();
}, []);




  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowVideo(false);
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxFileSize) {
        setError("Datei ist zu groß. Maximal 2 MB erlaubt.");
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

const handleSpeichern = async () => {
  const user = auth.currentUser;
  if (!user) {
    setError("Du musst eingeloggt sein.");
    return;
  }

  try {
    let logoUrl = null;

    if (logoPreview) {
      // Prüfen, ob es bereits eine Firebase Storage URL ist
      if (logoPreview.startsWith("https://firebasestorage.googleapis.com/")) {
        logoUrl = logoPreview; // bereits hochgeladen → wiederverwenden
      } else {
        // sonst: base64 in Blob umwandeln und neu hochladen
        const blob = await (await fetch(logoPreview)).blob();
        const storageRef = ref(storage, `firmenlogos/${user.uid}`);
        await uploadBytes(storageRef, blob);
        logoUrl = await getDownloadURL(storageRef);
      }
    }

    const firmendaten = {
      firma,
      anschrift,
      adresse,
      land,
      logoUrl,
    };

    await setDoc(doc(db, "firmen", user.uid), firmendaten);

    alert("Firmendaten erfolgreich gespeichert!");
  } catch (err) {
    console.error(err);
    setError("Fehler beim Speichern der Daten.");
  }
};


  const handleWeiter = () => {
    navigate("/team");
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar activePage="contacts" activeSubPage="firmendaten" />

      <main className="flex-1 p-10 ml-80 max-w-3xl">
        <h1 className="text-4xl font-bold text-[#e8562a] mb-10">Firmendaten</h1>

<form className="w-full max-w-[100rem] mx-auto border border-gray-300 rounded-md overflow-hidden bg-white">

  {/* Firma */}
  <div className="flex items-center gap-6 border-b border-gray-300 px-8 py-4">
    <Building2 className="text-[#e8562a] w-6 h-6 flex-shrink-0" />
    <label htmlFor="firma" className="w-44 text-lg font-bold text-gray-700">
      Firma
    </label>
    <input
      id="firma"
      type="text"
      value={firma}
      onChange={(e) => setFirma(e.target.value)}
      className="flex-1 min-w-[400px] max-w-[700px] border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#e8562a]"
      placeholder="Firmenname eingeben"
    />
  </div>

  {/* Firmenanschrift */}
  <div className="flex items-center gap-6 border-b border-gray-300 px-8 py-4">
    <Home className="text-[#e8562a] w-6 h-6 flex-shrink-0" />
    <label htmlFor="anschrift" className="w-44 text-lg font-bold text-gray-700">
      Firmenanschrift
    </label>
    <input
      id="anschrift"
      type="text"
      value={anschrift}
      onChange={(e) => setAnschrift(e.target.value)}
      className="flex-1 min-w-[400px] max-w-[700px] border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#e8562a]"
      placeholder="Straße und Hausnummer"
    />
  </div>

  {/* Adresse */}
  <div className="flex items-center gap-6 border-b border-gray-300 px-8 py-4">
    <MapPin className="text-[#e8562a] w-6 h-6 flex-shrink-0" />
    <label htmlFor="adresse" className="w-44 text-lg font-bold text-gray-700">
      Adresse
    </label>
    <input
      id="adresse"
      type="text"
      value={adresse}
      onChange={(e) => setAdresse(e.target.value)}
      className="flex-1 min-w-[400px] max-w-[700px] border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#e8562a]"
      placeholder="PLZ und Ort"
    />
  </div>

  {/* Land */}
  <div className="flex items-center gap-6 border-b border-gray-300 px-8 py-4">
    <Globe className="text-[#e8562a] w-6 h-6 flex-shrink-0" />
    <label htmlFor="land" className="w-44 text-lg font-bold text-gray-700">
      Land
    </label>
    <input
      id="land"
      type="text"
      value={land}
      onChange={(e) => setLand(e.target.value)}
      className="flex-1 min-w-[400px] max-w-[700px] border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#e8562a]"
      placeholder="Land eingeben"
    />
  </div>

  {/* Firmenlogo Upload */}
<div className="flex items-center gap-6 border-b border-gray-300 px-8 py-6">
  <UploadCloud className="text-[#e8562a] w-6 h-6 flex-shrink-0" />

  {/* Label wie bei den anderen Feldern */}
  <label htmlFor="logo-upload" className="w-44 text-lg font-bold text-gray-700">
    Firmenlogo
  </label>

  {/* Upload-Bereich wie ein Input-Feld positioniert */}
  <div className="flex flex-col items-center justify-center min-w-[400px] max-w-[700px]">
    <label
      htmlFor="logo-upload"
      className="w-40 h-40 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden hover:border-[#e8562a] transition-colors"
      title="Klicke hier, um ein Bild hochzuladen"
    >
      {logoPreview ? (
        <img
          src={logoPreview}
          alt="Firmenlogo"
          className="max-w-full max-h-full object-contain"
        />
      ) : (
        <>
          <UploadCloud size={36} className="text-gray-400 mb-2" />
          <span className="text-gray-400 text-xs text-center px-2">
            Klicke zum Hochladen
          </span>
        </>
      )}
    </label>

    <input
      type="file"
      accept="image/*"
      onChange={handleLogoChange}
      className="hidden"
      id="logo-upload"
    />

    <p className="mt-2 text-xs text-gray-500 max-w-xs text-center">
      PNG, JPG oder SVG, max. 2 MB.
    </p>

    {error && (
      <p className="mt-1 text-xs text-red-600 font-semibold max-w-xs text-center">
        {error}
      </p>
    )}
  </div>
</div>


  {/* Buttons */}
  <div className="flex justify-between px-8 py-4 border-t border-gray-300 bg-white sticky bottom-0">
    <button
      type="button"
      onClick={handleSpeichern}
      className="bg-[#e8562a] hover:bg-[#cf3e17] text-white px-6 py-2 rounded-md text-base transition"
    >
      Speichern
    </button>

    <button
      type="button"
      onClick={handleWeiter}
      className="next-button flex items-center gap-2 bg-[#e8562a] hover:bg-[#cf3e17] text-white px-6 py-2 rounded-md text-base transition"
    >
      Team
      <ArrowRight className="w-5 h-5" />
    </button>
  </div>
</form>
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

export default Firmendaten;
