"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const formData = new FormData(event.target as HTMLFormElement);

    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setMessage("Connexion réussie !");
        (event.target as HTMLFormElement).reset();
        router.push("/");
      } else {
        setMessage(data.error || "Email ou mot de passe incorrect.");
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

      <label htmlFor="password">Mot de passe</label>
      <input id="password" name="password" type="password" required />

      <button type="submit" disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}