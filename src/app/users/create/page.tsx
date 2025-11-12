'use client';

import React from 'react';

// Je crée mon composant de page pour créer un.e utilisateur.ice
export default function CreateUserPage() {
    // Fonction pour gérer la soumission du formulaire
    function handleSubmit(event) {
        event.preventDefault();
        console.log('Formulaire soumis');
    }
    return (
        <div>
            <h1>Rejoindre la communauté des vendeur.euses</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Email de l'utilisateur.ice"
                    required
                />
                <input
                    type="text"
                    placeholder="Nom de l'utilisateur.ice"
                    required
                />
                <input
                    type="text"
                    placeholder="Prénom de l'utilisateur.ice"
                    required
                />
                <input 
                    type="password"
                    placeholder="Mot de passe"
                    required
                />
                <button type="submit">
                    S'inscrire comme vendeur.euse
                </button>

            </form>
        </div>
    )
}