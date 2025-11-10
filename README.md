# Antique Shop Frontend

A modern marketplace frontend for furniture trading between individuals, built with Next.js and TypeScript.

## Project Overview

This frontend application provides an intuitive interface for the furniture marketplace with support for three user roles:

- **Sellers**: User-friendly interface to register, manage profiles, and list furniture for sale
- **Administrators**: Dashboard to validate/reject listings and manage marketplace content
- **Consumers**: Browse approved listings, manage shopping cart, and complete purchases

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:Yanis-Ada/antique-shop-front.git
   cd antique-shop-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
   NEXTAUTH_URL=http://localhost:3001
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3001] to see the application.

## Features

- **Responsive Design**: Optimized for desktop and mobile devices
- **Authentication**: Secure user authentication with Google OAuth integration
- **Real-time Updates**: Live updates for product listings and cart management
- **Admin Dashboard**: Complete administration interface for marketplace management
- **Shopping Cart**: Intuitive cart management with persistent storage

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **State Management**: React Context API
- **HTTP Client**: Axios

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - TypeScript language reference
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
