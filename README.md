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

## 🧭 Repository Layout

### Apps

- `@dukkani/api` (`apps/api`) - API gateway for oRPC, OpenAPI, auth endpoints, and webhooks.
- `@dukkani/dashboard` (`apps/dashboard`) - Merchant dashboard for products, orders, customers, and settings.
- `@dukkani/storefront` (`apps/storefront`) - Customer storefront and checkout runtime.
- `@dukkani/web` (`apps/web`) - Public marketing and product website.

### Shared packages

- `@dukkani/auth`, `@dukkani/common`, `@dukkani/config`
- `@dukkani/core`, `@dukkani/db`, `@dukkani/env`
- `@dukkani/logger`, `@dukkani/migrations`, `@dukkani/orpc`
- `@dukkani/storage`, `@dukkani/tracing`, `@dukkani/ui`, `@dukkani/ci-tools`

For package-level boundaries and dependency guidance, see `.cursor/rules/packages/00-package-index.mdc`.

### AI assistant rules and skills

- Canonical project rules live in `.cursor/rules/*.mdc`.
- Windsurf reads `.windsurfrules`, which points to the same canonical `.cursor/rules` content.
- Workspace skills are maintained in `.windsurf/skills` and mirrored to `.agents/skills` via symlink.
- Naming conventions source of truth: `.cursor/rules/01-naming-conventions.mdc`.

---

## 🚀 Getting Started

Quickstart (full setup guide is in [CONTRIBUTING.md](./CONTRIBUTING.md)):

```bash
git clone https://github.com/FindMalek/dukkani.git
cd dukkani
pnpm install
pnpm run bootstrap
pnpm run dev
```

Local app ports:

- **Web**: `http://localhost:3001`
- **API**: `http://localhost:3002`
- **Dashboard**: `http://localhost:3003`
- **Storefront**: `http://localhost:3004`

For environment setup, Docker, seeded data, issue workflow, and PR checklist, see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 🤝 Contributing

We welcome contributions from the open-source community.
Start from [GitHub Issues](https://github.com/FindMalek/dukkani/issues), pick a scoped task, and follow our contribution workflow.

**Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting a PR.**

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