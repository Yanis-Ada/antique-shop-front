"use client";
import { useEffect, useState } from "react";

type Furniture = {
  id?: number;
  title: string;
  type: string;
  dimensions: string;
  colors: string;
  materials: string;
  description: string;
  price: number;
  imageUrl: string;
  adminNotes: string;
  status?: string;
};

type User = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [furnitures, setFurnitures] = useState<Furniture[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Furniture>({
    title: "",
    type: "",
    dimensions: "",
    colors: "",
    materials: "",
    description: "",
    price: 0,
    imageUrl: "",
    adminNotes: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/users/me", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));

    fetch("http://localhost:3001/api/furniture?seller=true", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => setFurnitures(Array.isArray(data) ? data : []));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    // Vérification des champs
    if (
      !form.title.trim() ||
      !form.type.trim() ||
      !form.dimensions.trim() ||
      !form.colors.trim() ||
      !form.materials.trim() ||
      !form.description.trim() ||
      !form.price ||
      !form.imageUrl.trim()
    ) {
      setMessage("Tous les champs sont requis.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/furniture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Annonce créée et soumise à validation !");
        setFurnitures((prev) => [...prev, data]);
        setShowModal(false);
        setForm({
          title: "",
          type: "",
          dimensions: "",
          colors: "",
          materials: "",
          description: "",
          price: 0,
          imageUrl: "",
          adminNotes: ""
        });
      } else {
        setMessage(data.error || "Erreur lors de la création.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur serveur.");
    }
  }

  return (
    <main>
      <h1>Profil utilisateur</h1>
      {user && (
        <div style={{ marginBottom: "2rem" }}>
          <p>
            <strong>Prénom :</strong> {user.firstName}
          </p>
          <p>
            <strong>Nom :</strong> {user.lastName}
          </p>
          <p>
            <strong>Email :</strong> {user.email}
          </p>
        </div>
      )}

      <h2>Mes annonces</h2>
      <button onClick={() => setShowModal(true)}>Créer une annonce</button>
      <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Dimensions</th>
            <th>Couleurs</th>
            <th>Matières</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Image</th>
            <th>Notes admin</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {furnitures.map((f) => (
            <tr key={f.id}>
              <td>{f.title}</td>
              <td>{f.type}</td>
              <td>{f.dimensions}</td>
              <td>{f.colors}</td>
              <td>{f.materials}</td>
              <td>{f.description}</td>
              <td>{f.price} €</td>
              <td>
                {f.imageUrl && (
                  <img src={f.imageUrl} alt={f.title} style={{ width: "50px" }} />
                )}
              </td>
              <td>{f.adminNotes}</td>
              <td>{f.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {message && <p>{message}</p>}

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              minWidth: "320px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h2>Publier une annonce</h2>
            <label>
              Nom de l'annonce
              <input name="title" value={form.title} onChange={handleChange} required />
            </label>
            <label>
              Type de meuble
              <input name="type" value={form.type} onChange={handleChange} required />
            </label>
            <label>
              Dimensions
              <input name="dimensions" value={form.dimensions} onChange={handleChange} required />
            </label>
            <label>
              Couleurs
              <input name="colors" value={form.colors} onChange={handleChange} required />
            </label>
            <label>
              Matières
              <input name="materials" value={form.materials} onChange={handleChange} required />
            </label>
            <label>
              Description
              <textarea name="description" value={form.description} onChange={handleChange} required />
            </label>
            <label>
              Prix
              <input name="price" type="number" value={form.price} onChange={handleChange} required />
            </label>
            <label>
              URL de l'image
              <input name="imageUrl" value={form.imageUrl} onChange={handleChange} required />
            </label>
            <label>
              Notes admin (optionnel)
              <input name="adminNotes" value={form.adminNotes} onChange={handleChange} />
            </label>
            <button type="submit">Soumettre l'annonce</button>
            <button type="button" onClick={() => setShowModal(false)}>
              Annuler
            </button>
          </form>
        </div>
      )}
    </main>
  );
}