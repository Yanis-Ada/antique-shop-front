"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [pathname]);

  function handleAuthClick() {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      router.push("/users/login");
    } else {
      router.push("/users/login");
    }
  }

  return (
    <nav>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li><Link href="/">Accueil</Link></li>
        <li><Link href="/users/register">Inscription</Link></li>
        <li><Link href="/users/profile">Profil</Link></li>
        <li><Link href="/cart">Panier</Link></li>
        <li>
          <button onClick={handleAuthClick}>
            {isLoggedIn ? "Déconnexion" : "Connexion"}
          </button>
        </li>
      </ul>
    </nav>
  );
}