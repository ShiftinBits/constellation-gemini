# constellation

**Role**: Gemini CLI extension for Constellation code intelligence platform.

## Extension Structure

```
constellation-gemini/
├── gemini-extension.json     Extension manifest (name: constellation, v1.0.0)
├── GEMINI.md                 Global instructions
│
├── commands/                 6 slash commands (user-invoked)
│   ├── status.toml           API connectivity check
│   ├── diagnose.toml         Full health check
│   ├── impact.toml           Symbol change impact analysis
│   ├── deps.toml             File dependency analysis
│   ├── unused.toml           Dead code finder
│   └── architecture.toml     Codebase architecture overview
│
├── agents/                   3 specialized sub-agents (autonomous specialists)
│   ├── source-scout.md       Codebase exploration
│   ├── impact-investigator.md Change risk assessment
│   └── dependency-detective.md Dependency health
│
├── skills/                   1 specialized skill (procedural guidance)
│   └── constellation-troubleshooting/ Troubleshooting guide
│
├── hooks/
│   ├── hooks.json            3 hooks (SessionStart, BeforeTool, PreCompress)
│   └── prompts/              Prompt templates for hooks
│
└── README.md                 User-facing documentation
```

## Key Concepts

**MCP Server** — All API calls flow through `mcp_constellation_code_intel`. Commands and agents use this tool to interact with the Constellation platform.

## Code Intelligence Mode

You have access to Constellation's `code_intel` tool, which provides structural understanding of the codebase through a graph database. Use it proactively to enhance the quality and safety of your responses.

### Before Modifying Code

Always check before you change:
1. **Impact check**: Before editing a function, class, or interface, run `api.impactAnalysis()` to understand the blast radius. Mention the risk level and affected files in your response.
2. **Dependency awareness**: Before adding imports, run `api.getDependencies()` and `api.findCircularDependencies()` to verify you won't create cycles.
3. **Usage trace**: Before renaming or deleting, run `api.traceSymbolUsage()` to find all references.

### When Explaining Code

Provide architectural context:
- Use `api.getCallGraph()` to explain execution flow and call chains.
- Use `api.getDependencies()` / `api.getDependents()` to show how modules relate.
- Reference the broader architecture when explaining a specific file's role.

### Response Format

When presenting code intelligence findings:
- Lead with the key insight or risk.
- Use file:line references for easy navigation.
- Group related findings.
- Flag high-risk changes prominently using `constellation-error` or `constellation-warning`.

## Component Patterns

### Commands

Commands are defined in `.toml` files in the `commands/` directory. They provide a prompt and use standard slash command syntax.

### Sub-agents

Sub-agents are autonomous specialists defined in `.md` files in the `agents/` directory. They operate in independent context loops to save tokens in the main session.

| Sub-agent | Focus |
|-----------|-------|
| source-scout | Code navigation, discovery |
| impact-investigator | Risk assessment, dependents |
| dependency-detective | Dependency health, cycles |

### Skills

Skills provide procedural guidance and are defined in `skills/*/SKILL.md`. They are activated to help the main agent follow specific workflows.

| Skill | Focus |
|-------|-------|
| constellation-troubleshooting | Troubleshooting guide |

### Hooks

Hooks inject Constellation-specific context into various points of the Gemini CLI lifecycle, ensuring the model always prefers `code_intel` for structural code questions.
