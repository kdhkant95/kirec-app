@AGENTS.md

# VAR Frontend Implementation Guide

This project is a mobile-first dark-theme football video review web app.

## Current Stack
- Framework: Next.js 16.2.4 App Router
- Runtime UI: React 19.2.4
- Language: TypeScript
- Styling: Tailwind CSS 4 plus CSS variables in `src/app/globals.css`
- Auth: NextAuth v5, Google sign-in only
- Database: Supabase PostgreSQL with Prisma
- Font: local NEXON Lv1 Gothic via `next/font/local`

## Important Next.js Rule
This is Next.js 16, not older Next.js. Before changing routes, layouts, server/client component boundaries, navigation, or build behavior, read the relevant docs in `node_modules/next/dist/docs/`.

## Design Source Of Truth
- Figma file: `https://www.figma.com/design/oyr5aYJQliYRER2eBXSG3p/VAR`
- Foundation page: variables, text styles, effect styles
- `01 Core Primitives`: reusable UI primitive specs
- `02 Auth`: auth screen references
- Local repo foundation summary: `docs/ui-foundation.md`

Use Figma and `docs/ui-foundation.md` before implementing visual UI. Do not use the older `DESIGN.md` Runway notes as the current product design system.

## Figma MCP Workflow
Claude Code has a local Figma Desktop MCP server configured for this project:

- MCP server name: `figma-desktop`
- URL: `http://127.0.0.1:3845/mcp`

When implementing from Figma:
1. Confirm Figma Desktop is open, the target file is open, and Dev Mode MCP is enabled.
2. Use Figma MCP design context before coding. Prefer the exact Figma node URL from the user.
3. Fetch design context and screenshot for the target node.
4. Map Figma styles to existing repo tokens and primitives instead of inventing new patterns.
5. If Figma MCP tools are unavailable, stop and tell the user to restart the Claude Code VS Code panel and run `/mcp`.

## UI Implementation Rules
- Preserve the existing VAR dark theme.
- Prefer existing primitives in `src/components/ui/primitives`.
- Extend existing primitives instead of creating duplicate components.
- Use CSS variables from `src/app/globals.css` for color, spacing, radius, border, and elevation.
- Use NEXON Lv1 Gothic typography classes from `src/app/globals.css`.
- Keep icon usage centralized in `src/components/ui/icons/var-icons.tsx`.
- Do not add unrelated product pages while implementing a Figma component or screen.

## Verification
Before finishing UI work, run:

```bash
./node_modules/.bin/tsc --noEmit
node ./node_modules/eslint/bin/eslint.js <changed-files>
```

For larger changes, also run:

```bash
npm run build
```
