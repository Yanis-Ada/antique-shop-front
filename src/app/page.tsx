"use client";

import React, { useEffect, useState } from "react";
import FurnitureCard from "./components/FurnitureCard";

type Furniture = {
  id: number;
  title: string;
  price: number;
  imageUrl?: string;
};

export default function HomePage() {
  const [furnitures, setFurnitures] = useState<Furniture[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/catalogue")
      .then((res) => res.json())
      .then((data) => setFurnitures(Array.isArray(data) ? data : []))
      .catch(() => setFurnitures([]));
  }, []);

  return (
    <main>
      <h1>Meubles en vente</h1>
      <ul>
        {furnitures.length === 0 && <li>Aucun meuble disponible.</li>}
        {Array.isArray(furnitures) &&
          furnitures.map((furniture) => (
            <FurnitureCard
              key={furniture.id}
              id={furniture.id}
              title={furniture.title}
              price={furniture.price}
              imageUrl={furniture.imageUrl}
              onClick={() => {}}
            />
          ))}
      </ul>
    </main>
  );
}