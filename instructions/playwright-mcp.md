# Tool Adoption — Playwright MCP
 
## Phase 1 — Inventory
- Runtime surface: one MCP server process, `npx @playwright/mcp@latest`, plus an
  installed browser. No library is added to the project's dependencies.
- Capability: drives a real browser — navigate, accessibility snapshot, click, type, wait.
- Access granted: any URL the agent chooses, plus browser profile state (cookies, storage).
- Foreign instruction artifacts shipped: none. The tool ships no skills, pipelines,
  agents, or conventions of its own.
- Demo content shipped: none entering this project.
- Overlap with existing capabilities: none. No current capability can observe a live page.
 
## Phase 2 — Reconciliation
| Artifact | Type | Disposition | Reason | Project target | Risk / approval needed |
| --- | --- | --- | --- | --- | --- |
| `@playwright/mcp` server | Executable tool | wrap | Exposed only through a project skill, never called ad hoc | `implement-test` skill, locator-confirmation section | Browser access and profile state — requires approval |
| Tool documentation | External docs | reference | Useful context, not binding project behavior | Linked from this adoption note | None |
| Foreign instruction bundle | — | discard | The tool ships none; nothing to import into the instruction system | — | None |
| Optional tool groups (vision, PDF, devtools, network, storage, testing, config) | Executable tool | discard | Not needed for locator confirmation; left disabled to keep the surface small | — | None |
 
## Scope limits
- Runs with `--isolated`, so no run inherits or leaves browser state.
- Bound to the Implement step only; no other step may call browser tools.
- A live observation is never evidence for closure. What the browser showed must be
  written into a produced artifact before any step may cite it.
 
## Phase 4 — Cleanup check
- No demo pages, demo tests, or vendor fixtures were added.
- No foreign instruction file entered `instructions/`.
- The approved runtime surface is the only thing retained.
- `AGENTS.md` lists the new capability.