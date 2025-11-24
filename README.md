# Antique Shop Frontend

A modern marketplace frontend for furniture trading between individuals, built with Next.js and TypeScript.

## Project Overview

This frontend application provides an interface for the furniture marketplace with support for three user roles:

- **Sellers**: Register, manage profiles, and list furniture for sale
- **Administrators**: Validate/reject listings and manage marketplace content
- **Consumers**: Browse approved listings

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
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3001] to see the application.

## Features

- **JWT Authentication**: Authenticates users via JWT tokens, stored in localStorage
- **Basic User & Listing Management**: Register, view profile, and create furniture listings
- **Manual Testing**: API endpoints tested via Postman
- **App Router**: Uses Next.js App Router (`src/app` structure)
- **No styling framework**: No Tailwind CSS or other CSS libraries used yet

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **HTTP Client**: fetch API
- **State Management**: React useState/useEffect

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)