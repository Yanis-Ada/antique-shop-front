"use client";
import { useEffect, useState } from "react";

type Furniture = {
  id: number;
  title: string;
  price: number;
  status: "pending" | "online";
};

export default function AdminPage() {
  const [furnitures, setFurnitures] = useState<Furniture[]>([]);
  const [message, setMessage] = useState("");

  // Récupère les annonces depuis l'API
  useEffect(() => {
    fetch("http://localhost:3001/api/furniture", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setFurnitures(data));
  }, []);

  // Action pour valider/refuser/supprimer une annonce
  async function handleAction(id: number, action: "validate" | "refuse" | "delete") {
    setMessage("");
    let url = `http://localhost:3001/api/furniture/${id}`;
    let method = "PATCH";
    if (action === "delete") {
      method = "DELETE";
    } else {
      url += `/${action}`;
    }
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(
          action === "validate"
            ? "Annonce validée !"
            : action === "refuse"
            ? "Annonce refusée !"
            : "Annonce supprimée !"
        );
        setFurnitures((prev) => prev.filter((f) => f.id !== id));
      } else {
        setMessage(data.error || "Erreur lors de l'action.");
      }
    } catch {
      setMessage("Erreur serveur.");
    }
  }

  return (
    <main style={{ background: "#f8f8f8", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>Gestion des annonces</h1>
      {message && <p>{message}</p>}
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
        <thead>
          <tr>
            <th style={{ padding: "1rem", border: "2px solid #888" }}>Nom</th>
            <th style={{ padding: "1rem", border: "2px solid #888" }}>Prix</th>
            <th style={{ padding: "1rem", border: "2px solid #888" }}>Statut</th>
            <th style={{ padding: "1rem", border: "2px solid #888" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {furnitures.map((furniture) => (
            <tr key={furniture.id}>
              <td style={{ padding: "1rem", border: "2px solid #888" }}>{furniture.title}</td>
              <td style={{ padding: "1rem", border: "2px solid #888" }}>{furniture.price}€</td>
              <td style={{ padding: "1rem", border: "2px solid #888" }}>
                {furniture.status === "online" ? (
                  <span style={{
                    background: "#7ed957",
                    color: "#222",
                    padding: "0.5em 1em",
                    borderRadius: "8px",
                    fontWeight: "bold"
                  }}>En ligne</span>
                ) : (
                  <span style={{
                    background: "#e0e0e0",
                    color: "#222",
                    padding: "0.5em 1em",
                    borderRadius: "8px",
                    fontWeight: "bold"
                  }}>À valider</span>
                )}
              </td>
              <td style={{ padding: "1rem", border: "2px solid #888" }}>
                {furniture.status === "pending" && (
                  <>
                    <button
                      style={{
                        background: "#888",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.5em",
                        marginRight: "0.5em",
                        cursor: "pointer"
                      }}
                      title="Valider"
                      onClick={() => handleAction(furniture.id, "validate")}
                    >
                      ✔️
                    </button>
                    <button
                      style={{
                        background: "#888",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.5em",
                        marginRight: "0.5em",
                        cursor: "pointer"
                      }}
                      title="Refuser"
                      onClick={() => handleAction(furniture.id, "refuse")}
                    >
                      ❌
                    </button>
                  </>
                )}
                <button
                  style={{
                    background: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.5em",
                    cursor: "pointer"
                  }}
                  title="Supprimer"
                  onClick={() => handleAction(furniture.id, "delete")}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {furnitures.length === 0 && <p style={{ marginTop: "2rem" }}>Aucune annonce à afficher.</p>}
    </main>
  );
}