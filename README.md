# Fracc Admin

A modern, multi-tenant administration platform built with Next.js 16 and Supabase. This application is designed to handle dynamic subdomains for different tenants, providing a centralized admin dashboard and tenant-specific views.

## 🚀 Tech Stack

-   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Database & Auth**: [Supabase](https://supabase.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## ✨ Key Features

-   **Multi-tenancy**: Built-in support for dynamic subdomains (e.g., `tenant.domain.com`) handled via middleware-like proxy logic.
-   **Admin Dashboard**: Dedicated administration interface at `/admin`.
-   **Type Safety**: End-to-end type safety with TypeScript and generated Supabase database types.
-   **Modern UI**: Clean and responsive design using Tailwind CSS.

## 📂 Project Structure

```
├── app/
│   ├── admin/          # Admin dashboard routes
│   ├── s/              # Tenant-specific routes (handled via proxy)
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── lib/
│   ├── supabase/       # Supabase client configuration
│   ├── tenants.ts      # Tenant data fetching logic
│   └── utils.ts        # Utility functions
├── types/              # TypeScript type definitions
├── proxy.ts            # Custom proxy logic for subdomain routing
└── middleware.ts       # Next.js middleware (if applicable)
```

## 🛠️ Getting Started

### Prerequisites

-   Node.js (v18+ recommended)
-   pnpm (v9+ recommended)

### Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

```bash
pnpm install
```

### Running Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

-   **Landing Page**: `http://localhost:3000`
-   **Admin Dashboard**: `http://localhost:3000/admin` (Note: Subdomain routing requires local DNS setup or `*.localhost` support)

## 🗄️ Database Types

This project uses Supabase generated types for TypeScript. If you make changes to your database schema, update the types by running:

```bash
# Login to Supabase CLI
pnpx supabase login

# Generate types
pnpx supabase gen types typescript --project-id "$SUPABASE_PROJECT_REF" --schema public > ./database.types.ts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
