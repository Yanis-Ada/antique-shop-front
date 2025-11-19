import React from "react";

type FurnitureProps = {
  id: number;
  title: string;
  price: number;
  imageUrl?: string;
  onClick: () => void;
};

export default function FurnitureCard({ id, title, price, imageUrl, onClick }: FurnitureProps) {
  return (
    <li>
      <a href={`/furniture/${id}`} onClick={onClick}>
        <img src={imageUrl} alt="" style={{ maxWidth: 200 }} />
        <h2>{title}</h2>
        <p>{price} €</p>
        <button type="button">Acheter</button>
      </a>
    </li>
  );
}