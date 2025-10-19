# Campaign Website Monorepo

This is a monorepo using pnpm workspaces containing:

- **campaign-website**: Nuxt application
- **docs**: VitePress documentation

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (`npm install -g pnpm`)

## Project Structure

```
.
├── packages/
│   ├── campaign-website/  # Nuxt application
│   └── docs/              # VitePress documentation
├── pnpm-workspace.yaml
└── package.json
```

## Setup Instructions

### 1. Install pnpm (if not already installed)

```bash
npm install -g pnpm
```

### 2. Set up Nuxt app

```bash
# Navigate to packages directory
cd packages

# Create Nuxt app
pnpm create nuxt@latest

# When prompted for the project name, enter: campaign-website
# Follow the remaining prompts and choose your preferences
```

### 3. Set up VitePress docs

```bash
# Still in the packages directory
mkdir docs
cd docs

# Initialize VitePress
pnpm init

# Install VitePress
pnpm add -D vitepress

# Initialize VitePress structure
pnpx vitepress init
```

### 4. Install all dependencies

```bash
# Go back to root
cd ../..

# Install all workspace dependencies
pnpm install
```

## Available Scripts

From the root directory:

```bash
# Run both app and docs in development mode (parallel)
pnpm dev

# Run only the Nuxt app
pnpm campaign-website:dev

# Run only the VitePress docs
pnpm docs:dev

# Build all packages
pnpm build

# Build only the campaign website
pnpm campaign-website:build

# Build only the docs
pnpm docs:build
```

## Package-specific Commands

You can also run commands in specific packages:

```bash
# Run a command in the campaign-website package
pnpm --filter campaign-website <command>

# Run a command in the docs package
pnpm --filter docs <command>
```

## Next Steps

After setting up both packages:

1. Update the `name` field in each package's `package.json` to match the workspace structure
2. Configure your Nuxt app in `packages/campaign-website/nuxt.config.ts`
3. Configure your VitePress docs in `packages/docs/.vitepress/config.ts`
4. Move your existing docs from the root `docs/` folder to the VitePress structure
