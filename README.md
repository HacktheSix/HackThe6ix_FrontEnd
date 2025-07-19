# ModelCompare - YOLO & Vision Model Comparison Platform

A modern web application for comparing YOLO and computer vision models with side-by-side analysis, performance metrics, and carbon-aware analytics. Built with Next.js, TypeScript, and Tailwind CSS.

> **🔒 Security First**: This project uses environment variables for all sensitive configuration. Never commit API keys or secrets to version control. See the [Security Best Practices](#-security-best-practices) section below.

## 🚀 Features

- **Model Upload & Management**: Drag-and-drop interface for uploading YOLO models, ONNX files, and custom vision models
- **Side-by-Side Comparison**: Compare models across accuracy, speed, memory usage, and carbon footprint
- **Real-Time Dashboard**: Live system metrics, performance analytics, and sustainability tracking
- **Advanced Analytics**: Comprehensive charts and visualizations using Chart.js
- **Carbon-Aware Metrics**: Track environmental impact with detailed energy consumption data
- **Responsive Design**: Modern UI with dark mode support and smooth animations
- **TypeScript**: Full type safety and modern development experience

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.4.1 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Heroicons, Radix UI
- **Charts**: Chart.js + react-chartjs-2
- **File Upload**: react-dropzone
- **Fonts**: Google Fonts (Courier Prime, Press Start 2P)

### Backend Integration
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Auth0 (planned integration)
- **Real-time Updates**: WebSocket support
- **File Storage**: Supabase Storage

## 📋 System Requirements

### Minimum Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Node.js**: Version 18.17 or higher
- **npm**: Version 9 or higher (or yarn/pnpm)
- **Git**: For cloning the repository
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Recommended Setup
- **Node.js**: Version 20.x (LTS)
- **npm**: Version 10.x
- **Code Editor**: VS Code with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier
- **RAM**: 16GB for optimal development experience
- **Storage**: SSD with 10GB free space

### Node.js Installation

**macOS (using Homebrew):**
```bash
brew install node
```

**Windows:**
Download from [nodejs.org](https://nodejs.org/)

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 🚀 Quick Setup Guide

### Prerequisites Checklist
- [ ] Node.js 18.17+ installed
- [ ] npm 9+ (or yarn/pnpm) installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

### 1. Clone & Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd hackthe6ix

# Install all dependencies
npm install

# Create environment file
touch .env.local
```

### 2. Required Dependencies

The project automatically installs these dependencies:

**Core Framework:**
- Next.js 15.4.1 (React framework)
- React 19.1.0 (UI library)
- TypeScript 5 (Type safety)

**Styling & UI:**
- Tailwind CSS 4 (Utility-first CSS)
- Heroicons 2.2.0 (Icons)
- Radix UI 1.2.3 (Accessible components)
- Lucide React 0.525.0 (Additional icons)

**Charts & Data:**
- Chart.js 4.5.0 (Charting library)
- react-chartjs-2 5.3.0 (React wrapper)

**File Handling:**
- react-dropzone 14.3.8 (File upload)

**Utilities:**
- clsx 2.1.1 (Conditional classes)
- class-variance-authority 0.7.1 (Component variants)
- tailwind-merge 3.3.1 (Tailwind class merging)

**Backend Integration:**
- @supabase/supabase-js 2.52.0 (Database client)

**Development Tools:**
- ESLint (Code linting)
- TypeScript compiler
- Tailwind CSS PostCSS plugin

### 3. Environment Configuration

```bash
# Add your environment variables to .env.local
nano .env.local
# or
code .env.local
```

### 3. Environment Setup

**⚠️ SECURITY WARNING: Never commit API keys or secrets to version control!**

Create a `.env.local` file in the root directory (this file is already in `.gitignore`):

```bash
# Create the environment file (DO NOT commit this file!)
touch .env.local
```

Add the following environment variables to `.env.local`:

```bash
# Supabase Configuration
# Get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Auth0 Configuration (for future integration)
# Get these from your Auth0 application settings
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret

# Backend API (for real-time stats)
# Point to your backend server URL
BACKEND_URL=http://localhost:8000

# Optional: Google Analytics
# Get this from your Google Analytics account
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Development Settings
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

**Important Security Notes:**
- `.env.local` is already in `.gitignore` (line 32: `.env*`) and will NOT be committed
- Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Keep `SUPABASE_SERVICE_ROLE_KEY` and `AUTH0_CLIENT_SECRET` server-side only
- Use different keys for development and production environments
- The `.gitignore` file properly excludes all environment files (`.env*`)

### 4. Database Setup

#### Option A: Using Supabase (Recommended)

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and API keys from the project settings
3. Add them to your `.env.local` file
4. Run the database migrations (see `BACKEND_INTEGRATION_GUIDE.md` for schema)

#### Option B: Local Development (Mock Data)

The application includes fallback mock data, so you can run without a backend initially.

### 4. Start Development Server

```bash
# Start the development server
npm run dev
```

### 5. Verify Setup

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Expected Results:**
- ✅ Landing page loads with "Compare YOLO & Vision Models"
- ✅ Navigation menu appears
- ✅ Dark/light mode toggle works
- ✅ All pages are accessible (Upload, Compare, Dashboard, etc.)

**If you see errors:**
- Check that all dependencies installed correctly: `npm install`
- Verify Node.js version: `node --version` (should be 18.17+)
- Clear cache: `rm -rf .next && npm run dev`
- Check console for specific error messages

### 6. Development Commands

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📁 Project Structure

```
hackthe6ix/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Dashboard page
│   │   ├── upload/            # Model upload page
│   │   ├── compare/           # Model comparison page
│   │   ├── signin/            # Authentication page
│   │   ├── get-started/       # Onboarding page
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable React components
│   │   ├── ChartCard.tsx      # Chart wrapper component
│   │   ├── ComparisonTable.tsx # Model comparison table
│   │   ├── Nav.tsx            # Navigation component
│   │   └── UploadDropzone.tsx # File upload component
│   └── hooks/                 # Custom React hooks
│       └── useRealTimeStats.ts # Real-time data fetching
├── public/                    # Static assets
├── BACKEND_INTEGRATION_GUIDE.md # Backend setup guide
├── REAL_TIME_INTEGRATION.md   # Real-time features guide
├── package.json               # Dependencies and scripts
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── next.config.ts             # Next.js configuration
```

## 🎨 Customization

### Fonts

The application uses two Google Fonts:
- **Courier Prime**: For all content (monospace)
- **Press Start 2P**: For headings and emphasis

To change fonts, update the font imports in `src/app/layout.tsx` and the font variables in `src/app/globals.css`.

### Styling

The application uses Tailwind CSS v4 with a custom theme. Key customization points:

- **Colors**: Defined in `src/app/globals.css` under `@theme`
- **Animations**: Custom keyframes in `src/app/globals.css`
- **Components**: Tailwind classes with custom utilities

### Environment Variables

All environment variables are prefixed with `NEXT_PUBLIC_` for client-side access. See the environment setup section above for required variables.

## 🧪 Development

### Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Development Features

- **Hot Reload**: Automatic page updates during development
- **TypeScript**: Full type checking and IntelliSense
- **ESLint**: Code linting and formatting
- **Turbopack**: Fast bundling and development server

### Code Style

- **TypeScript**: Strict mode enabled
- **Functional Components**: Use function declarations, not arrow functions
- **Props**: Define with interfaces, not prop-types
- **Hooks**: Only at top level, extract reusable logic
- **Styling**: Tailwind CSS classes with custom utilities

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)
- Strict mode enabled
- Path aliases configured (`@/*` → `./src/*`)
- Next.js plugin integration

### Tailwind CSS (`tailwind.config.ts`)
- Custom font families
- Content paths for all components
- Theme extensions

### Next.js (`next.config.ts`)
- Basic configuration
- Ready for additional plugins and optimizations

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Use `npm run build` and `npm run start`
- **Railway**: Automatic deployment from GitHub
- **Docker**: Use the official Next.js Docker image

### Environment Variables for Production

**⚠️ SECURITY: Set these in your deployment platform's environment variables section, NOT in code!**

```bash
# Required (set in deployment platform)
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

# Optional (set in deployment platform)
AUTH0_SECRET=your_production_auth0_secret
AUTH0_BASE_URL=your_production_domain
AUTH0_ISSUER_BASE_URL=your_production_auth0_domain
AUTH0_CLIENT_ID=your_production_auth0_client_id
AUTH0_CLIENT_SECRET=your_production_auth0_client_secret
BACKEND_URL=your_production_backend_url
NEXT_PUBLIC_GA_ID=your_production_google_analytics_id
```

**Production Security Checklist:**
- ✅ Use production API keys (different from development)
- ✅ Enable HTTPS/SSL
- ✅ Set up proper CORS policies
- ✅ Configure rate limiting
- ✅ Enable security headers
- ✅ Use environment-specific databases

## 🔒 Security Best Practices

### Environment Variables & Secrets

**CRITICAL: Never commit secrets to version control!**

1. **Local Development:**
   - Use `.env.local` for local secrets (already in `.gitignore`)
   - Never commit `.env.local` to Git
   - Use different keys for development vs production

2. **Production Deployment:**
   - Set environment variables in your deployment platform (Vercel, Netlify, etc.)
   - Use platform-specific secret management
   - Rotate keys regularly

3. **API Key Management:**
   - `SUPABASE_SERVICE_ROLE_KEY`: Server-side only, never expose to client
   - `AUTH0_CLIENT_SECRET`: Server-side only, never expose to client
   - `NEXT_PUBLIC_*`: Safe for client-side (public keys only)

4. **Security Checklist:**
   - ✅ `.env.local` in `.gitignore`
   - ✅ No secrets in `package.json`
   - ✅ No hardcoded API keys in source code
   - ✅ Use environment variables for all configuration
   - ✅ Different keys for dev/staging/production

### File Upload Security

- Validate file types and sizes
- Scan uploaded files for malware
- Store files in secure cloud storage (Supabase Storage)
- Implement proper access controls

### Authentication Security

- Use Auth0 for secure authentication
- Implement proper session management
- Validate JWT tokens on all protected routes
- Use HTTPS in production

## 🔍 Troubleshooting

### Common Setup Issues

**Port 3000 already in use:**
```bash
# Use a different port
npm run dev -- -p 3001
```

**Node.js version too old:**
```bash
# Check version
node --version

# Update Node.js (macOS with Homebrew)
brew update && brew upgrade node

# Update Node.js (Windows)
# Download from https://nodejs.org/

# Update Node.js (Linux)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Dependencies installation fails:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# If using yarn
rm -rf node_modules yarn.lock
yarn install
```

**TypeScript errors:**
```bash
# Clear TypeScript cache
rm -rf .next
npm run dev

# Check TypeScript version
npx tsc --version
```

**Tailwind CSS not working:**
```bash
# Rebuild CSS
npm run build

# Check Tailwind config
npx tailwindcss --help
```

**Environment variables not loading:**
- Ensure `.env.local` is in the root directory
- Restart the development server
- Check variable names (must start with `NEXT_PUBLIC_` for client-side)
- Verify file permissions: `ls -la .env.local`

**Build errors:**
```bash
# Clear all caches
rm -rf .next node_modules/.cache
npm install
npm run build
```

**Performance issues:**
- Use SSD storage
- Increase Node.js memory: `NODE_OPTIONS="--max-old-space-size=4096"`
- Disable telemetry: `NEXT_TELEMETRY_DISABLED=1`

### Performance Optimization

- **Images**: Use Next.js Image component for optimization
- **Fonts**: Google Fonts are automatically optimized
- **Bundling**: Turbopack provides fast development builds
- **Caching**: Implemented in API routes and static assets

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the integration guides in the project

---

**Happy coding! 🚀**
