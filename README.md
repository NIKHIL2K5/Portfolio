# Nikhil // Portfolio & Admin Studio

A high-performance, cinematic portfolio and content management system built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Designed for creatives who demand a premium, studio-grade aesthetic and seamless administrative control.

![Modern Studio UI](https://img.shields.io/badge/Aesthetic-Modern%20Studio-000000?style=for-the-badge)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-6633cc?style=for-the-badge&logo=framer&logoColor=white)

## ✨ Features

- **Cinematic Portfolio**: High-fidelity landing page with physics-based animations and custom glassmorphism effects.
- **Admin Approval Terminal**: A secure, token-based administrative dashboard for managing projects, experiences, and messages.
- **Dynamic Content Management**: Fully integrated with MongoDB for real-time updates without redeploying.
- **Responsive Architecture**: Pixel-perfect layout across all device sizes, optimized for professional mobile browsing.
- **Studio-Grade UX**: Micro-interactions, custom scrollbars, and fluid transitions powered by Framer Motion.

## 🚀 Tech Stack

- **Core**: Next.js 15 (App Router), TypeScript
- **Styling**: Tailwind CSS, Vanilla CSS (Design Tokens)
- **Animations**: Framer Motion, CSS Keyframes
- **Database**: MongoDB (via Mongoose)
- **Backend**: Next.js API Routes (Edge Runtime compatible)

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.x or higher
- MongoDB instance (Atlas or local)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/portfolio-nikhil.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env.local`:
   ```env
   MONGODB_URI=your_mongodb_uri
   ADMIN_TOKEN=your_secure_token
   ```
4. Launch development server:
   ```bash
   npm run dev
   ```

## 📐 Architecture

```text
src/
├── app/              # Next.js App Router (Portfolio & Admin)
├── components/       # Reusable UI Components
├── models/           # MongoDB Schema Definitions
├── lib/              # Utility Functions & Database Config
└── api/              # Secure API Endpoints
```

## 🔒 Security

The admin panel is protected via a secure token-based verification system. Access is granted only to authenticated sessions via the `approval/[token]` route structure, ensuring your dashboard remains private and secure.

---

Developed with ❤️ by **Nikhil**
