---
name: constellation-troubleshooting
description: This skill should be used when the user asks about "Constellation errors", "fix Constellation", "debug Constellation", "Constellation not working", "API connection issues", "indexing problems", "MCP server", "Failed to reconnect", mentions any Constellation error codes (AUTH_ERROR, PROJECT_NOT_INDEXED, etc.), or when Constellation commands fail.
---

# Constellation Troubleshooting

Diagnose Constellation plugin failures. If unavailable, continue with local search/read and clearly note degraded mode.

## Triage Order

1. If `code_intel` cannot be called, treat as MCP startup/config issue.
2. If a response includes `error.code`, branch by code:
   `AUTH_ERROR`, `PROJECT_NOT_INDEXED`, `SYMBOL_NOT_FOUND`, `FILE_NOT_FOUND`, `API_UNREACHABLE`.
3. If status is unclear, run `/constellation:status` then `/constellation-diagnose`.

## MCP Server Issues

Symptom: connection failures or missing `code_intel`.

1. Restart Gemini.
2. Verify MCP binary:
```bash
npx -y @constellationdev/mcp@latest --version
```
3. Verify MCP config points to `npx -y @constellationdev/mcp@latest` and passes `CONSTELLATION_ACCESS_KEY`.
   
## Authentication Issues (AUTH_ERROR)

Symptom: invalid credentials.

1. Configure credentials:
```bash
npx @constellationdev/cli auth
```
2. Read `error.guidance[0]` for key-state details.
3. Regenerate expired/revoked keys in Constellation UI.

## Indexing Issues (PROJECT_NOT_INDEXED)

Symptom: index missing/stale.

1. Index:
```bash
constellation index --full
```
2. Force reindex:
```bash
constellation index --full --force
```

## Connectivity Issues (API_UNREACHABLE)

Symptom: timeout or refusal.

1. Check local network/DNS.
2. Check status page: `https://status.constellationdev.io/`
3. Verify API URL in `constellation.json`.

## Query Issues (SYMBOL_NOT_FOUND, FILE_NOT_FOUND)

Usually not fatal; item is absent from index/query scope.

1. Broaden search terms.
2. Check spelling/case/path.
3. Confirm language/extension is indexed.
4. Reindex if files were added recently.

When blocked, continue task with local tools and state degraded mode.

## Error Code Quick Reference

| Code | Cause | Fix |
|------|-------|-----|
| `AUTH_ERROR` | Missing/invalid/expired API key | `constellation auth` |
| `PROJECT_NOT_INDEXED` | Project needs indexing | `constellation index --full` |
| `SYMBOL_NOT_FOUND` | Typo or stale index | Broader search or re-index |
| `FILE_NOT_FOUND` | Path mismatch or stale index | Verify path; re-index |
| `API_UNREACHABLE` | API not running / network issue | Check network, status page, API URL |

See `references/error-codes.md` for the complete error code reference.
