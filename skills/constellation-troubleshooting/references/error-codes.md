# Constellation Error Codes Reference

## MCP Server Errors

| Code | Message | Cause | Fix | Recoverable |
|------|---------|-------|-----|-------------|
| `MCP_UNAVAILABLE` | MCP server not running | stdio server failed to start | Restart Gemini CLI, check gemini-extension.json | No |

## Authentication Errors

| Code | Message | Cause | Fix | Recoverable |
|------|---------|-------|-----|-------------|
| `AUTH_ERROR` | Authentication failed | Missing or invalid API key | Run `constellation auth` | No |
| `AUTHZ_ERROR` | Authorization denied | Key lacks permission for this project | Check project access in web UI | No |
| `AUTH_EXPIRED` | API key expired | Key has been rotated or revoked | Regenerate key in web UI, run `constellation auth` | No |

## Configuration Errors

| Code | Message | Cause | Fix | Recoverable |
|------|---------|-------|-----|-------------|
| `NOT_CONFIGURED` | Project not configured | Missing or invalid `constellation.json` | Run `constellation init` | No |
| `API_UNREACHABLE` | Cannot reach API | Network error, server down, wrong URL | Check network, verify API URL in `constellation.json` | Yes |

## Project Errors

| Code | Message | Cause | Fix | Recoverable |
|------|---------|-------|-----|-------------|
| `PROJECT_NOT_INDEXED` | Project needs indexing | Never indexed or index was cleared | Run `constellation index --full` | Yes* |
| `PROJECT_NOT_REGISTERED` | Project not found | Project ID not recognized by API | Verify project ID or check organization access | No |
| `PROJECT_INACTIVE` | Project deactivated | Project has been deactivated | Reactivate in web UI | No |
| `BRANCH_NOT_FOUND` | Branch not in index | Branch hasn't been indexed | Run `constellation index --full` on the branch | Yes* |
| `STALE_INDEX` | Index outdated | Index is significantly behind current code | Run `constellation index --full --force` | Yes* |

## Query Errors

| Code | Message | Cause | Fix | Recoverable |
|------|---------|-------|-----|-------------|
| `SYMBOL_NOT_FOUND` | Symbol not found | Typo, deleted, or not indexed | Try broader search, re-index | Yes |
| `FILE_NOT_FOUND` | File not in index | Wrong path or unsupported file type | Check path, verify language config | Yes |
| `TOOL_NOT_FOUND` | Unknown API method | Invalid method name in code | Check available tools in MCP | No |
| `VALIDATION_ERROR` | Invalid parameters | Wrong parameter types or values | Check method signature | Yes |

## Severity Levels

| Severity | Codes | Impact |
|----------|-------|--------|
| Critical | `MCP_UNAVAILABLE`, `API_UNREACHABLE`, `SERVICE_UNAVAILABLE` | All features unavailable |
| High | `AUTH_ERROR`, `AUTHZ_ERROR`, `AUTH_EXPIRED` | Authenticated features blocked |
| Medium | `PROJECT_NOT_INDEXED`, `BRANCH_NOT_FOUND`, `STALE_INDEX`, `RATE_LIMITED` | Partial functionality |
| Low | `SYMBOL_NOT_FOUND`, `FILE_NOT_FOUND`, `VALIDATION_ERROR`, `EXECUTION_TIMEOUT` | Single query affected |
| Info | `TOOL_NOT_FOUND`, `EXECUTION_ERROR`, `NOT_CONFIGURED` | User action needed |
