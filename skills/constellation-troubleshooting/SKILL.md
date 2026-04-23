---
name: constellation-troubleshooting
description: This skill should be used when the user asks about "Constellation errors", "fix Constellation", "debug Constellation", "Constellation not working", "API connection issues", "indexing problems", "MCP server", "Failed to reconnect", mentions any Constellation error codes (AUTH_ERROR, PROJECT_NOT_INDEXED, etc.), or when Constellation commands fail.
---

# Constellation Troubleshooting

Quick diagnostic procedures for Constellation extension issues.

## Quick Diagnosis Flowchart

```
Issue Reported
     |
     v
Can mcp_constellation_code_intel be called?
     |                    |
    YES                   NO
     |                    |
     v                    v
  API Error          MCP Server Issue
 (has code)         (see MCP Diagnosis)
     |
     v
Check error.code:
- AUTH_ERROR --> Authentication section
- PROJECT_NOT_INDEXED --> Indexing section
- SYMBOL_NOT_FOUND --> Query Issues section
- API_UNREACHABLE --> Connectivity section
```

## MCP Server Issues

**Symptom:** "Failed to reconnect to plugin:constellation:constellation" or tool calls fail entirely.

**Cause:** The MCP server isn't starting or is crashing.

**Quick Fixes:**

1. **Restart Gemini CLI** - MCP connections initialize at startup.

2. **Verify gemini-extension.json configuration:**

   ```json
   {
     "mcpServers": {
       "constellation": {
         "type": "stdio",
         "command": "npx",
         "args": ["-y", "@constellationdev/mcp@latest"]
       }
     }
   }
   ```

## Authentication Issues (AUTH_ERROR)

**Symptom:** "Authentication failed" or "Invalid API key"

**Quick Fixes:**

1. **Configure credentials:**
   ```bash
   npx @constellationdev/cli auth
   ```

2. **Check if key is set:**
   ```bash
   echo $CONSTELLATION_ACCESS_KEY
   ```

3. **If key is expired:** Regenerate in Constellation web UI under Settings > API Keys.

## Indexing Issues (PROJECT_NOT_INDEXED)

**Symptom:** "Project not indexed" or empty results

**Quick Fixes:**

1. **Index the project:**
   ```bash
   cd /path/to/your/project
   constellation index --full
   ```

2. **Force reindex if stale:**
   ```bash
   constellation index --full --force
   ```

## Connectivity Issues (API_UNREACHABLE)

**Symptom:** Timeout or connection refused

**Quick Fixes:** Check network connectivity and verify the API URL in `constellation.json`.

## Error Codes Reference

For a complete list of error codes, refer to `./references/error-codes.md`.
