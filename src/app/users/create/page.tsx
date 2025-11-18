'use client';

import React from 'react';
import CentralContainer from '@/components/CentralContainer';

export default function CreateUserPage() {
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const password = formData.get('password') as string;

        if (!email || !firstName || !lastName || !password) {
            alert('Veuillez remplir tous les champs du formulaire.');
            return;
        }

        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            role: 'SELLER' as const,
        };

        console.log('Données à envoyer à l\'API:', userData);
        console.log('Mot de passe (non envoyé pour l\'instant):', password ? '****' : 'vide');

        try {
            const response = await fetch('http://localhost:3001/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const newUser = await response.json();
                console.log('Utilisateur créé avec succès:', newUser);
                alert('Inscription réussie ! Bienvenue dans la communauté des vendeur.euses');
                // Réinitialiser le formulaire
                (event.target as HTMLFormElement).reset();
            } else {
                const errorData = await response.json();
                console.error('Erreur lors de la création:', errorData);
                alert('Erreur lors de l\'inscription. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            alert(`Erreur de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        }
    }

    return (
        <CentralContainer>
            <h1>Register toi</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    name="email"
                    placeholder="Email de l'utilisateur.ice"
                    required
                    style={{ border: '1px solid white', background: 'transparent', color: 'white', margin: '8px', padding: '8px' }}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Nom de l'utilisateur.ice"
                    required
                    style={{ border: '1px solid white', background: 'transparent', color: 'white', margin: '8px', padding: '8px' }}
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="Prénom de l'utilisateur.ice"
                    required
                    style={{ border: '1px solid white', background: 'transparent', color: 'white', margin: '8px', padding: '8px' }}
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    required
                    style={{ border: '1px solid white', background: 'transparent', color: 'white', margin: '8px', padding: '8px' }}
                />
                <button type="submit">
                    Push da bouton
                </button>
            </form>
        </CentralContainer>
    )
}