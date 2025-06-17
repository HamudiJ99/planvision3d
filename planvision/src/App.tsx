import './App.css'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ResetPassword from './pages/ResetPasswort'
import Firmendaten from "./pages/Kontaktdaten/Firmendaten"
import Team from "./pages/Kontaktdaten/Team"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/firmendaten" element={<Firmendaten />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </Router>
  );
}

export default App
