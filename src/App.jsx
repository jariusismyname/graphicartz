import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Intro from "./components/Intro.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { auth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "./firebase";

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [isAdmin, setIsAdmin] = useState(false);

  // Persist theme
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Track Firebase auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setIsAdmin(!!user));
    return () => unsub();
  }, []);

  // Secret admin unlock: double-click logo → prompt email/password → Firebase Auth
  const handleSecretAccess = async () => {
    const email = prompt("Enter admin email:");
    if (!email) return;
    const password = prompt("Enter admin password:");
    if (!password) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Admin mode unlocked!");
    } catch (err) {
      console.error(err);
      alert("Login failed. Check your credentials.");
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    alert("Admin signed out.");
  };

  return (
    <>
      <Header
        dark={dark}
        setDark={setDark}
        isAdmin={isAdmin}
        onSecretAccess={handleSecretAccess}
        onSignOut={handleSignOut}
      />
      <main>
        <section id="intro"><Intro /></section>
        <section id="projects"><Projects isAdmin={isAdmin} /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </>
  );
}
  