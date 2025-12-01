import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Navbar from "./NavBar";
import NavbarAdmin from "./NavbarAdmin";
import { useState, useEffect } from "react";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [role, setRole] = useState(localStorage.getItem("rol")); // "admin" o null

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("jwt"));
      setRole(localStorage.getItem("rol"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      {role === "admin" && token ? <NavbarAdmin /> : <Navbar />}
      <AppRoutes />
    </Router>
  );
}
