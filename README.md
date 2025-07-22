# Better Auth Starter with Admin Protection

![ChatGPT Image Jun 9, 2025, 07_09_10 PM](https://github.com/user-attachments/assets/660133ca-5463-4c77-9ece-37280caa229c)

## Overview

The Better Auth Starter is a complete authentication and authorization system using Next.js, Better Auth, Shadcn, Drizzle, and Neon. It includes comprehensive admin protection across multiple layers: server-side, client-side, and API protection.

## Features

- 🔐 **Complete Authentication System** (Login, Signup, Email Verification, Password Reset)
- 👑 **Multi-Layer Admin Protection** (Server-side, Client-side, API-level)
- 🧪 **API Testing Components** to demonstrate protection levels
- 📊 **User Management** for admins
- 🎨 **Modern UI** with Shadcn components and dark mode support

## Getting Started

### Installation

Install the required dependencies:

```bash
pnpm i
```


### Database Setup

Push the database schema:

```bash
npx drizzle-kit push
```

### Seed Admin User

Create an admin user:

```bash
pnpm run seed-db
```

This creates an admin user with:
- **Email**: `mmurakamimoses@gmail.com`
- **Password**: `Mbasketball@1`
- **Role**: `admin`

### Development Server

Start the development server:

```bash
pnpm dev
```

### Stripe Webhook Setup

#### Development & Production
Use the unified webhook endpoint for both development and production:

**Development:**
```bash
stripe listen --forward-to localhost:3000/api/webhook
```

**Production:**
```
https://yourdomain.com/api/webhook
```

This unified endpoint automatically routes:
- Subscription events → Better Auth
- Lifetime access events → Custom handler

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## Admin Protection System

This starter includes a comprehensive 3-layer admin protection system.

### Protection Layers

#### 1. Server-Side Page Protection (Most Secure)

```tsx
// app/admin/some-page/page.tsx
import { requireAdmin } from "@/lib/admin";

export default async function AdminPage() {
  const session = await requireAdmin(); // Auto-redirects non-admins
  
  return (
    <div>
      <h1>Admin Content</h1>
      <p>Welcome, {session.user.name}!</p>
    </div>
  );
}
```

#### 2. API Route Protection

**Authenticated Users Only:**
```tsx
// app/api/user/profile/route.ts
export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  return NextResponse.json({ user: session.user });
}
```

**Admin Users Only:**
```tsx
// app/api/admin/status/route.ts
export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  return NextResponse.json({ admin: session.user });
}
```


### Admin Plugin Features

```tsx
// List users
const users = await authClient.admin.listUsers({
  query: { limit: 10, offset: 0 }
});

// Check permissions
const hasPermission = await authClient.admin.hasPermission({
  permissions: { user: ["list"] }
});

// Get user sessions
const sessions = await authClient.admin.listUserSessions({
  userId: "user-id"
});
```