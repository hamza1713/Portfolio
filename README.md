# Hamza Ali — AI/ML Engineer Portfolio

An editorial portfolio and lead-intake platform showcasing production AI/ML systems, RAG architectures, agentic workflows, and LLM evaluation benchmarks.

## 🚀 Tech Stack

- **Frontend:** React 19, Tailwind CSS v4, Radix UI, Framer Motion, Lucide React, Wouter
- **Backend:** Express, tRPC v11, Drizzle ORM, MySQL
- **Tooling:** Vite 7, TypeScript, Vitest, tsx, esbuild
- **AI Integration:** Google Gemini API / Built-in LLM Engine

## ✨ Features

- **Signal / Proof Editorial Design:** Technical documentation aesthetics with Fraunces & IBM Plex typography.
- **Interactive AI Assistant:** Grounded AI chat assistant to answer visitor questions about Hamza''s background and skills.
- **Lead Capture & Anti-Spam:** Project inquiry form with budget/timeline selection and rate-limited bot protection.
- **Admin Dashboard:** Protected area for reviewing project inquiries and assistant follow-up requests.
- **Demo & Walkthrough Embeds:** Loom/Video demo integration for featured AI products (FinSight, Factscope AI).

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 20.x
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/hamza1713/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:3000/`.

### Testing & Typecheck

```bash
# Run TypeScript type check
npm run check

# Run Vitest test suites
npm test
```

### Production Build

```bash
# Build client and server bundles
npm run build

# Start production server
npm start
```

## 📄 License

MIT
