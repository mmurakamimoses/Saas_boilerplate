# Saas Boilerplate – Role & Payment Protected Auth Starter

A personal boilerplate I built for myself to kickstart SaaS projects with robust authentication, role-based access, payment-based protection, and a modern landing page.

---

## ✨ Features

- **Authentication**: Email/password & Google login via [Better Auth](https://github.com/better-auth/better-auth)
- **Email Delivery**: Integrated with [Resend](https://resend.com/) for password reset and email confirmation flows
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

## 🔑 Authentication & Email Flows

This boilerplate provides a complete authentication system, tightly integrated with Better Auth and Resend for seamless user onboarding and security:

- **Signup & Login**: Users can register and log in using email/password or Google OAuth.
- **Email Verification**: Upon signup, users receive a verification email (sent via Resend) to confirm their email address before accessing protected features.
- **Password Reset**: Users can request a password reset link, which is delivered to their email via Resend. The reset flow is secure and user-friendly.
- **Google OAuth**: One-click login/signup with Google, managed by Better Auth.
- **Session Management**: Secure session handling for all authentication methods.
- **Email Templates**: Customizable, branded emails for verification and password reset, located in `components/auth/emails/`.
- **Resend Integration**: All transactional emails (verification, password reset) are sent using Resend.

**Example Flows:**
- User signs up → Receives verification email → Clicks link → Gains access
- User forgets password → Requests reset → Receives email → Resets password securely

---

## 🛡️ Protection Layers

### 1. **Role-Based Page Protection**
- Restrict pages to `admin` or `user` roles using server-side checks.
- Example:

```tsx
// app/(admin)/admin/page.tsx
import { requireAdmin } from "@/lib/admin";

export default async function AdminPage() {
  const session = await requireAdmin();
  // ...
}
```

### 2. **API Route Protection**
- Restrict API endpoints by role or payment type.
- Example:

```ts
// app/api/admin/status/route.ts
const session = await auth.api.getSession({ headers: request.headers });
if (!session?.user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
if (session.user.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
```

### 3. **Payment Type Protection**
- Restrict features or endpoints to users with active subscriptions or one-time purchases.
- Example:

```ts
if (session.user.payment_type !== "subscription") {
  return NextResponse.json({ error: "Subscription required" }, { status: 402 });
}
```

---

## 💳 Stripe Payments
- Supports both recurring subscriptions and one-time purchases.
- Unified webhook endpoint for all payment events.

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
- You’ll need to set up your own Stripe, Resend, and Google OAuth credentials.
- See `.env.example` for required environment variables.