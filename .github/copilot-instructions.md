# AI Coding Agent Instructions

## Architecture Overview

This is a **pnpm workspace monorepo** using **Turborepo** for orchestration. The codebase follows a strict separation between apps and reusable packages:

- **`apps/web`**: Next.js 15 frontend (App Router, React 19, Tailwind CSS 4)
- **`apps/server`**: Express.js API server (port 3001, CORS enabled for localhost:3000)
- **`packages/ui`**: shadcn/ui component library with 60+ prebuilt components
- **`packages/types`**: Shared TypeScript types and API contracts
- **`packages/utils`**: Shared utility functions (includes `cn()` for className merging)
- **`packages/eslint-config`**: Centralized ESLint configurations (base, next, express, react-internal)
- **`packages/tsconfig`**: Shared TypeScript configurations

**Key architectural principle**: Apps consume packages via `workspace:*` protocol. Never duplicate code—extract to packages instead.

## Development Workflow

### Running the Project

```bash
pnpm dev          # Starts both web (3000) and server (3001) in parallel
pnpm build        # Builds all apps and packages with Turbo caching
pnpm lint         # Runs ESLint across all workspaces
pnpm lint:fix     # Auto-fixes lint issues
pnpm format:fix   # Formats code with Prettier
```

**Critical**: Always use `pnpm` (v9.12.1), never npm or yarn. The monorepo relies on pnpm workspace protocol.

### Turbo Task Dependencies

Turborepo automatically handles task orchestration via `turbo.json`:
- **`build`** depends on `^build` (builds dependencies first)
- **`lint`/`format`** depend on `^topo` (topological dependency order)
- **`dev`** tasks are persistent and never cached

When adding new packages, ensure they export properly for dependent apps to consume.

## Code Conventions

### Import Patterns

**Workspace packages** are imported using `@monorepo/` prefix:
```typescript
import { Button } from "@monorepo/ui/components/button";
import type { GetTestResponse } from "@monorepo/types";
import { cn } from "@monorepo/utils/styles";
```

**Type imports** use inline syntax per ESLint config:
```typescript
import { type MyType, myFunction } from "./module";
```

### Component Structure

**Next.js components** (apps/web):
- Use `"use client"` directive for client-side interactivity
- Import global styles from `@monorepo/ui/globals.css` in root layout
- Theme support via `next-themes` ThemeProvider (see `apps/web/src/providers/theme-provider`)

**shadcn/ui integration**:
- Components live in `packages/ui/src/components/`
- Configuration in `packages/ui/components.json` with custom aliases
- Add new components: `pnpm add-shadcn-component <component-name>` (runs in ui package context)

### API Communication

**Server routes** follow pattern:
```typescript
// apps/server/src/routes/test.ts
import { type GetTestResponse } from "@monorepo/types";
testRouter.get("/", (_, res) => {
  const response: GetTestResponse = { message: "..." };
  res.json(response);
});
```

**Client fetching**:
```typescript
// apps/web (see get-test.tsx)
const response = await fetch("http://localhost:3001/v1/test");
const data: GetTestResponse = await response.json();
```

**Type safety**: All API responses must have corresponding types in `@monorepo/types/api`.

### Styling Conventions

- **Tailwind CSS 4** with `@tailwindcss/postcss` (v4 syntax)
- Use `cn()` utility from `@monorepo/utils/styles` for conditional classes
- CSS variables defined in `packages/ui/src/globals.css` for theming
- Component variants use `class-variance-authority` (CVA)

## ESLint & Formatting

**Configuration inheritance**:
- Base: `@monorepo/eslint-config/base` (TypeScript strict mode, Prettier integration)
- Next.js: `@monorepo/eslint-config/next` (extends base + Next.js rules)
- Express: `@monorepo/eslint-config/express` (extends base + Node.js globals)

**Key enforced rules**:
- `consistent-type-imports`: Prefer `import type` with inline style
- `naming-convention`: PascalCase for types/interfaces
- `perfectionist/sort-objects`: Alphabetical object key sorting
- Prettier: 80 char width, 2-space indent, semicolons, double quotes, trailing commas

**Disabled warnings**: All errors downgraded to warnings via `eslint-plugin-only-warn`.

## Package Management

### Adding Dependencies

```bash
# Add to specific workspace
pnpm add <package> --filter @monorepo/ui

# Add to root (tooling only)
pnpm add -Dw <package>
```

### Creating New Packages

1. Create directory in `packages/`
2. Add `package.json` with `name: "@monorepo/<name>"`
3. Configure exports in `package.json`
4. Extend appropriate configs from `@monorepo/eslint-config` and `@monorepo/tsconfig`

## Common Pitfalls

1. **Port conflicts**: Server runs on 3001, Next.js on 3000. CORS is configured only for localhost:3000.
2. **Type imports**: Always use `type` keyword for type-only imports (ESLint will warn).
3. **shadcn aliases**: The ui package uses custom aliases in `components.json`—follow those patterns.
4. **Turbo caching**: If builds behave unexpectedly, try `pnpm clean` to clear Turbo cache.
5. **Workspace references**: Use `workspace:*` for internal dependencies, not version numbers.

## File Locations Reference

- **API routes**: `apps/server/src/routes/`
- **Next.js pages**: `apps/web/src/app/` (App Router)
- **UI components**: `packages/ui/src/components/`
- **Shared types**: `packages/types/src/api/`
- **Theme provider**: `apps/web/src/providers/theme-provider/`
- **ESLint configs**: `packages/eslint-config/*.js`
- **TypeScript configs**: `packages/tsconfig/*.json`
