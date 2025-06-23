# Stockholm Sauna Directory

The most comprehensive directory of saunas in Stockholm, serving both international tourists and local residents.

## 🏗️ Architecture

This is a modern full-stack web application built with:

- **Frontend**: Next.js 14.2.3 with TypeScript and Tailwind CSS
- **Backend**: Supabase (PostgreSQL database, authentication, APIs)
- **Deployment**: Vercel with global CDN
- **Structure**: Monorepo with npm workspaces

## 📁 Project Structure

```
stockholm-sauna-directory/
├── apps/
│   └── web/                 # Next.js application
├── packages/
│   ├── db/                  # Database schemas and client
│   ├── ui/                  # Shared UI components
│   ├── config/              # Configuration management
│   └── types/               # Shared TypeScript types
├── docs/                    # Documentation and requirements
├── package.json             # Root workspace configuration
└── vercel.json             # Vercel deployment configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stockholm-sauna-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```
   
   Fill in the required environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` (optional)

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

## 🧪 Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run type-check` - Run TypeScript type checking

## 🌐 Deployment

### Vercel Setup

1. **Create Vercel project**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the Next.js framework

2. **Configure build settings**
   - Build Command: `cd apps/web && npm run build`
   - Output Directory: `apps/web/.next`
   - Install Command: `npm install`

3. **Set environment variables**
   Add the following environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`

### Supabase Setup

1. **Create Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project in `eu-central-1` region
   - Note the project URL and anon key

2. **Database setup**
   - Database migrations will be handled in future stories
   - Initial schema will be created via SQL scripts

## 📝 Contributing

This project follows the BMAD methodology for structured development:

1. Stories are defined in `docs/stories/`
2. Each story contains detailed acceptance criteria and technical guidance
3. Development follows the story tasks sequentially
4. All changes must include appropriate tests

## 🔧 Technical Standards

- **TypeScript**: Strict mode enabled
- **Code Style**: ESLint with Next.js configuration
- **Testing**: Jest + React Testing Library + Playwright
- **Environment**: Centralized config in `packages/config`
- **Types**: Shared types in `packages/types`

## 📚 Documentation

- [Product Requirements](docs/prd/)
- [Architecture Document](docs/architecture.md)
- [User Stories](docs/stories/)

## 🏃‍♂️ Next Steps

After initial setup:
1. Configure Supabase database schema (Story 1.2)
2. Implement home page with map integration (Story 1.3)
3. Create sauna detail pages (Story 1.4)
4. Add site navigation and layout (Story 1.5)

## 📄 License

MIT License - see LICENSE file for details.
