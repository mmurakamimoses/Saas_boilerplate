# Saas Boilerplate – Role & Payment Protected Auth Starter

A personal boilerplate I built for myself to kickstart SaaS projects with robust authentication, role-based access, payment-based protection, and a modern landing page.

---

## ✨ Features

- **Authentication**: Email/password & Google login via [Better Auth](https://github.com/better-auth/better-auth)
- **Role-Based Protection**: Admin/user roles enforced on pages & APIs
- **Payment-Based Protection**: Restrict features by payment type (subscription or one-time)
- **Stripe Integration**: Supports subscriptions & one-time purchases
- **Admin Panel**: User management for admins
- **Modern UI**: Shadcn UI, MagicUI, and a template landing page
- **API Protection**: Authenticated & role/payment-guarded endpoints

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Database Setup

Push the schema to your database:

```bash
npx drizzle-kit push
```

### 3. Seed Admin User

Create a default admin user:

```bash
pnpm run seed-db
```

### 4. Stripe Webhook Setup

For local development, forward Stripe events to your webhook endpoint:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

In production, set your Stripe webhook to:

```
https://yourdomain.com/api/webhook
```

### 5. Start the Dev Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

---

## 💳 Stripe Payments
- Supports both recurring subscriptions and one-time purchases.
- Unified webhook endpoint for all payment events.

---

## 🔑 Authentication
- Email/password signup & login
- Google OAuth
- Email verification & password reset

---

## 🏠 Template Landing Page
- Modern, responsive landing page included for quick project launches.

---

## 🛠️ Useful Commands
- **Stripe Webhook (dev):** `stripe listen --forward-to localhost:3000/api/webhook`
- **Seed Admin:** `pnpm run seed-db`
- **Clear DB:** `pnpm run reset-db`
- **Start Dev Server:** `pnpm dev`

---

## 📁 Project Structure (Highlights)
- `app/` – Next.js app directory (routes, pages, API)
- `components/` – UI and form components
- `db/` – Drizzle ORM schema & config
- `lib/` – Auth, access control, and utilities
- `public/` – Static assets
- `scripts/` – DB seeding/reset scripts

---

## 📝 Notes
- Built for my own SaaS projects, but feel free to use or adapt!
- You’ll need to set up your own Stripe and Google OAuth credentials.
- See `.env.example` for required environment variables.