# <img src="https://constellationdev.io/gemini-icon.svg" height="30"> Constellation Extension for Gemini CLI

[![MCP Server](https://img.shields.io/badge/MCP-@constellationdev/mcp-black.svg?logo=modelcontextprotocol)](https://github.com/ShiftinBits/constellation-mcp) [![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-3DA639?logo=opensourceinitiative&logoColor=white)](LICENSE)

While Constellation's MCP server provides raw code intelligence capabilities, this plugin enhances your Gemini CLI experience with:

| Feature | Benefit |
|---------|---------|
| **Slash Commands** | Quick access to common workflows |
| **Contextual Skills** | Gemini automatically loads relevant knowledge when needed |
| **Session Hooks** | Transparent steering toward `code_intel` for structural code queries |

## Features

### Commands

Execute powerful analysis with simple slash commands:

| Command | Description |
|---------|-------------|
| `/constellation:status` | Check API connectivity and project indexing status |
| `/constellation:diagnose` | Quick health check for connectivity and authentication |
| `/constellation:impact <symbol> <file>` | Analyze blast radius before changing a symbol |
| `/constellation:deps <file> [--reverse]` | Map dependencies or find what depends on a file |
| `/constellation:unused` | Discover orphaned exports and dead code |
| `/constellation:architecture` | Get a high-level overview of your codebase structure |

### Skills

Gemini automatically activates specialized knowledge based on your questions:

| Skill | Triggers When You Ask About... |
|-------|-------------------------------|
| **constellation-troubleshooting** | Error codes, connectivity issues, debugging problems |
| **impact-analysis** | "Impact of changing X", "what would break if I modify X", "blast radius", "risk of renaming X", "safe to delete X" |

### Hooks

Event hooks transparently steer Gemini toward `code_intel` for structural code questions. All hooks are gated on `CONSTELLATION_ACCESS_KEY` being set (prefix `ak:`) and emit context only — they never block execution:

| Hook | Event | Matcher | Behavior |
|------|-------|---------|----------|
| **Session Context** | `SessionStart` | `.*` | Establishes `code_intel` as the primary tool for code understanding when a session starts |
| **Sub-agent Context** | `BeforeAgent` | `.*` | Injects the same awareness into spawned sub-agents (built-ins don't inherit `GEMINI.md`) |
| **Tool Steering** | `BeforeTool` | `grep_search\|glob` | Reminds Gemini to prefer `code_intel` for structural queries before falling back to text search |
| **Shell Steering** | `BeforeTool` | `run_shell_command` | Inspects `tool_input.command` and emits the same reminder when `grep`, `rg`, `glob`, `awk`, or `findstr` appears |

## Installation

### Prerequisites

1. **Constellation Account** (see [Constellation](https://app.constellationdev.io))
2. **Project indexed** in Constellation
3. **Access key** configured

### Quick Start

```bash
gemini extensions install https://github.com/ShiftinBits/constellation-gemini
```

## Usage Examples

### Check Your Setup

```
> /constellation:status

Status: Connected
Project: my-awesome-app
Files Indexed: 1,247
Symbols: 8,932
Languages: TypeScript, JavaScript
```

### Analyze Before Refactoring

```
> /constellation:impact validateUser src/auth/validator.ts

Symbol: validateUser (function)
Risk Level: MEDIUM
Files Affected: 12
Symbols Affected: 34
Test Coverage: 67%

Recommendations:
- Update unit tests in auth.spec.ts
- Check integration with UserController
```

### Find Dead Code

```
> /constellation:unused --kind function

Found 7 orphaned functions:
├── src/utils/legacy.ts
│   ├── formatLegacyDate (line 23)
│   └── parseLegacyConfig (line 45)
├── src/helpers/deprecated.ts
│   └── oldValidation (line 12)
...
```

### Understand Dependencies

```
> /constellation:deps src/services/payment.service.ts

Dependencies (12):
├── Internal (8)
│   ├── src/models/payment.model.ts
│   ├── src/utils/currency.ts
│   └── ...
└── External (4)
    ├── stripe
    ├── lodash
    └── ...

No circular dependencies detected.
```

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| `AUTH_ERROR` | Check `CONSTELLATION_ACCESS_KEY` is set correctly, use `constellation auth` CLI command to set |
| `PROJECT_NOT_INDEXED` | Run `constellation index --full` in your project |
| Commands not appearing | Restart Gemini CLI or check plugin path |

## Documentation

- [Constellation Documentation](https://docs.constellationdev.io) — Full platform documentation
- [MCP Server](https://github.com/shiftinbits/constellation-mcp) — Underlying MCP server
- [Gemini CLI Extensions](https://geminicli.com/docs/extensions/) — Extension development guide

## License

GNU Affero General Public License v3.0 (AGPL-3.0)

Copyright © 2026 ShiftinBits Inc.

See [LICENSE](LICENSE) file for details.
