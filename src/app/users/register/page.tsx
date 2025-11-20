"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const formData = new FormData(event.target as HTMLFormElement);

    const user = {
      email: formData.get("email"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Inscription réussie ! Vous êtes connecté.");
        (event.target as HTMLFormElement).reset();
      } else {
        setMessage(data.error || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      setMessage("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required />

      <label htmlFor="firstName">Prénom</label>
      <input id="firstName" name="firstName" type="text" required />

      <label htmlFor="lastName">Nom</label>
      <input id="lastName" name="lastName" type="text" required />

      <label htmlFor="password">Mot de passe</label>
      <input id="password" name="password" type="password" required minLength={8} />

      <button type="submit" disabled={loading}>
        {loading ? "Inscription..." : "S'inscrire"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}