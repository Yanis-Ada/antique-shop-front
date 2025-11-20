import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li><Link href="/">Accueil</Link></li>
        <li><Link href="/users/register">Inscription</Link></li>
        <li><Link href="/users/login">Connexion</Link></li>
        <li><Link href="/users/profile">Profil</Link></li>
        <li><Link href="/cart">Panier</Link></li>
      </ul>
    </nav>
  );
}