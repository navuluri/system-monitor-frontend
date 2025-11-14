# System Monitor 🖥️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb.svg)](https://reactjs.org/)

A modern, real-time system monitoring dashboard built with Next.js, React, and TypeScript. Monitor CPU, memory, disk, network, and processes across multiple servers from a single, beautiful interface.

## Screenshots

### Login View
![Servers](/images/login.png)

### Servers View
![Servers](/images/home.png)

### Process Monitor
![Processes](/images/details.png)

### Dark Mode
![Dark Mode](/images/dark.png)

---
## Pre-Requisites (IMPORTANT & MANDATORY)

- Install the backend as a service on target servers to expose system metrics via REST API. See the [Backend Agent Setup](https://github.com/navuluri/system-monitor-backend/blob/main/README.md) section for details.

## Features

-  **Real-time Monitoring** - Live updates every 5 seconds
-  **CPU Metrics** - Track utilization, per-core stats, and load averages
-  **Memory Stats** - Monitor RAM usage with detailed breakdowns
-  **Disk Usage** - View storage capacity and partition details
-  **Network Traffic** - Track bytes/packets sent and received
-  **Process Management** - View running processes with detailed information
-  **Modern UI** - Clean, responsive interface with dark mode support
-  **Secure Authentication** - GitHub OAuth integration
-  **Server Search** - Quickly find and filter servers
-  **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## Architecture

This project consists of two main components:

1. **Frontend Dashboard** (this repository) - Next.js web application
2. **Backend Agent** (separate) - System monitoring agent that runs on target servers

The dashboard communicates with backend agents via REST API to collect system metrics.

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- pnpm 8.x or higher
- PostgreSQL 14 or higher
- GitHub OAuth App credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/navuluri/system-monitor-frontend.git
   cd system-monitor-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and configure the following:
   ```env
   # Database
   POSTGRES_URL="postgresql://user:password@localhost:5432/system_monitor"

   # Authentication
   AUTH_SECRET="your-secret-key"  # Generate with: openssl rand -base64 32
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   ```

4. **Set up the database**
   ```bash
   # Create the database
   createdb system_monitor

   # Run the schema script
   psql -d system_monitor -f lib/scripts.sql
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App:
   - **Application name:** System Monitor
   - **Homepage URL:** `http://localhost:3000` (or your domain)
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
3. Copy the Client ID and Client Secret to your `.env.local`

### GitHub Enterprise Support

For GitHub Enterprise, add these to your `.env.local`:

```env
GITHUB_ENTERPRISE_URL="https://github.yourcompany.com"
```

### Database Configuration

The application uses PostgreSQL. See `lib/scripts.sql` for the schema.

**Server Info Table:**
- `id` - Unique identifier
- `ip` - Server IP address
- `hostname` - Server hostname
- `access_port` - Port where monitoring agent is running
- `cpu_percent`, `cpu_count`, `memory_percent`, etc. - Cached metrics

## Backend Agent Setup

The dashboard requires monitoring agents running on target servers. The agent should expose a REST API with the following endpoints:

- `GET /api/v1/system` - System information (boot time, users)
- `GET /api/v1/cpu` - CPU metrics
- `GET /api/v1/memory` - Memory usage
- `GET /api/v1/disk` - Disk usage
- `GET /api/v1/network` - Network statistics
- `GET /api/v1/process` - Running processes

**Note:** A compatible backend agent implementation will be provided separately.

## Development

### Project Structure

```
system-monitor/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth routes (login)
│   ├── api/               # API routes (proxy to agents)
│   ├── dashboard/         # Dashboard page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── cpu.tsx           # CPU metrics component
│   ├── memory.tsx        # Memory metrics component
│   └── ...
├── lib/                   # Utilities and database
│   ├── db.ts             # Database connection
│   ├── data.ts           # Data fetching functions
│   ├── validation.ts     # Input validation schemas
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

### Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run Biome linter
pnpm format     # Format code with Biome
```

### Code Quality

This project uses:
- **Biome** for linting and formatting
- **TypeScript** strict mode
- **Zod** for runtime validation

Run checks before committing:
```bash
pnpm lint
```

## Security

### Input Validation

All API endpoints validate input using Zod schemas to prevent:
- SSRF attacks
- SQL injection
- Invalid parameter types

### Authentication

- Uses NextAuth.js with GitHub OAuth
- All routes are protected by default (except login)
- Sessions are encrypted with `AUTH_SECRET`

## Customization

### Theming

The application supports light and dark modes using `next-themes`. Theme toggle is available in the navigation bar.

### Styling

Built with Tailwind CSS 4. Customize colors and styles in `app/globals.css`.

## API Routes

The frontend proxies requests to backend agents. All routes require authentication.

| Route | Purpose |
|-------|---------|
| `/api/cpu` | Fetch CPU metrics |
| `/api/memory` | Fetch memory usage |
| `/api/disk` | Fetch disk usage |
| `/api/network` | Fetch network stats |
| `/api/process` | Fetch process list |
| `/api/system` | Fetch system info |

**Query Parameters:** `host` (hostname/IP), `port` (agent port)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on:
- Code of conduct
- Development setup
- Pull request process
- Coding standards

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## Support

- Email: bhaskara[dot]navuluri[at]gmail[dot]com
- Issues: [GitHub Issues](https://github.com/navuluri/system-monitor-frontend/issues)
- Discussions: [GitHub Discussions](https://github.com/navuluri/system-monitor-frontend/discussions)

## Roadmap

- [ ] WebSocket support for real-time updates
- [ ] Historical data and charts
- [ ] Alert system with notifications
- [ ] Multi-user support with roles
- [ ] Docker deployment setup
- [ ] Mobile app (React Native)
- [ ] Prometheus/Grafana integration
- [ ] Plugin system for custom metrics

## Feature Request

You can contact me to request new features or improvements. Please provide details on the desired functionality and use cases.
