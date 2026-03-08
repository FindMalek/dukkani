# Dukkani

<div align="center">

![Dukkani - E-commerce for Tunisian businesses](./github.png)

![GitHub stars](https://img.shields.io/github/stars/FindMalek/dukkani?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/license-BSL-blue?style=for-the-badge)
![Contributors](https://img.shields.io/github/contributors/FindMalek/dukkani?style=for-the-badge)
[![Open Issues](https://img.shields.io/github/issues/FindMalek/dukkani?style=for-the-badge)](https://github.com/FindMalek/dukkani/issues)

**Enable every small and medium Tunisian business to sell online, easily and professionally.**

[Features](#-core-features) • [Getting Started](#-getting-started) • [Contributing](#-contributing)

</div>

---

## 🌟 Vision

Enable every small and medium Tunisian business to sell online, easily and professionally. We want to make launching an online store as simple as creating an Instagram account — no coding, no complexity, no barriers.

### The Problem

Most Tunisian and North African merchants still rely on physical stores and social media (like Instagram or Facebook) for sales. They lack easy access to affordable e-commerce tools that integrate with local delivery systems and payment gateways. Shopify and WooCommerce are too complicated or expensive for most.

### The Solution

A localized SaaS platform that helps businesses:

- Create a beautiful online store in minutes (with AI-assisted setup)
- Accept payments through local gateways (e.g., D17, Flouci, E-Dinar)
- Manage inventory, delivery, and orders all in one dashboard
- Offer multilingual experiences (Arabic, French, English)
- Seamlessly sync with Instagram or WhatsApp for quick sharing

### Target Market

- Small to medium local stores
- Artisan brands and clothing shops
- Food delivery or grocery shops
- Local resellers and social sellers (Instagram / Facebook merchants)

### Long-Term Vision

To become the **Shopify of North Africa** — starting with Tunisia, then scaling across Francophone and Arabic-speaking markets with localized infrastructure.

---

## 🚀 Core Features

- 🛍️ **Instant Store Setup Wizard** - Get your store online in minutes
- 🗺️ **Delivery Partner Integration** - Connect with local delivery services
- 🌐 **Multi-language Support** - Arabic, French, and English
- 📱 **Mobile-First Design** - Beautiful, responsive store templates
- 📦 **Inventory & Order Management** - Complete e-commerce solution
- 📊 **Sales Analytics Dashboard** - Track your business performance
- 🤖 **AI-Powered Features** - Product descriptions & SEO (coming soon)

---

## 🏗️ Tech Stack

This project is built with modern, type-safe technologies:

- **Framework**: [Next.js](https://nextjs.org/) (App Router) - Full-stack React framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type safety throughout
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/) ORM
- **API**: [oRPC](https://orpc.dev/) - End-to-end type-safe APIs with OpenAPI
- **Authentication**: [Better Auth](https://www.better-auth.com/) - Modern auth solution
- **UI**: [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **Monorepo**: [Turborepo](https://turbo.build/) - Optimized build system
- **Code Quality**: [Biome](https://biomejs.dev/) - Fast linting and formatting
- **PWA**: Progressive Web App support

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ and [pnpm](https://pnpm.io/) 10+
- [Docker](https://www.docker.com/) (for local database)
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/FindMalek/dukkani.git
cd dukkani
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env` file at the root of the project:
```bash
# Database (required)
DATABASE_URL="postgresql://postgres:password@localhost:5432/dukkani"

# CORS Origin (required for auth)
NEXT_PUBLIC_API_URL="http://localhost:3002"
```

4. **Set up the database**

```bash
pnpm run db:setup
```

This will:
- Start the PostgreSQL database container
- Push the Prisma schema to create all tables

5. **Seed the database (optional)**

```bash
pnpm run db:seed
```

This creates default users and sample data for development. See [Database Package README](./packages/db/README.md) for details.

6. **Start the development server**

- **Web** (3001): [http://localhost:3001](http://localhost:3001) - Marketing/landing site
- **API** (3002): [http://localhost:3002](http://localhost:3002) - Backend API
- **Dashboard** (3003): [http://localhost:3003](http://localhost:3003) - Merchant dashboard
- **Storefront** (3004): [http://localhost:3004](http://localhost:3004) - Customer-facing store (where shoppers browse and buy)

### Quick Commands

```bash
# Development
pnpm run dev              # Start all apps
pnpm run dev:api          # Start API only
pnpm run dev:dashboard    # Start Dashboard only
pnpm run dev:web          # Start marketing site
pnpm run dev:storefront   # Start storefront (customer store)
pnpm run dev:all          # Start API + Dashboard + Storefront

# Database
pnpm run db:studio        # Open Prisma Studio
pnpm run db:push          # Push schema changes
pnpm run db:seed          # Seed database
pnpm run db:reset-and-seed # Reset and seed

# Code Quality
pnpm run check            # Lint and format
pnpm run check-types      # Type check all packages
pnpm run build            # Build all packages
```

---


## 🤝 Contributing

We welcome contributions from the open-source community! Our [GitHub Issues](https://github.com/FindMalek/dukkani/issues) are organized as **tasks** — pick any issue labeled `good first issue`, `help wanted`, or `bug` and start contributing.

**Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting a PR.**

### How to contribute

1. **Browse [open issues](https://github.com/FindMalek/dukkani/issues)** — each issue is a task you can pick up
2. **Comment on an issue** you'd like to work on (so we avoid duplicate work)
3. **Fork & create a branch** following our [Contributing Guidelines](./CONTRIBUTING.md)
4. **Submit a PR** — we'll review and merge!

For detailed guidelines on development setup, code style, and PR process, see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 👥 Contributors

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- This section will be populated by all-contributors bot -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

We love our contributors! See [CONTRIBUTING.md](./CONTRIBUTING.md) to learn how you can contribute.

---

## 📄 License

This project is licensed under a Business Source License (BSL). 

**Commercial Use Restrictions**: This software may not be used for commercial purposes or financial gain without explicit written permission from the copyright holder. For commercial licensing inquiries, please contact the project maintainers.

**Non-Commercial Use**: You are free to view, modify, and use this software for non-commercial purposes, including personal projects, learning, and contributing to the open-source community.

See [LICENSE](./LICENSE) for full details.

---

![Alt](https://repobeats.axiom.co/api/embed/5253724feea20074afb52b53c0ed0ec9a83f0733.svg "Repobeats analytics image")

[![Star History Chart](https://api.star-history.com/svg?repos=FindMalek/dukkani&type=date&legend=top-left)](https://www.star-history.com/#FindMalek/dukkani&type=date&legend=top-left)