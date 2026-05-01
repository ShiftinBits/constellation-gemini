---
name: impact-analysis
description: Use when analyzing the impact of changing, renaming, or deleting a symbol. Provides risk assessment, blast radius, affected files, test coverage, and recommendations. Triggers for: "impact of changing X", "what would break if I modify X", "blast radius", "risk of renaming X", "safe to delete X"
---

# Impact Analysis

Analyze the impact of changing the specified symbol.

**Arguments (provided by the user in natural language):**
- Symbol name (required) — the function, class, or variable to analyze
- File path (optional) — helps disambiguate if multiple symbols share the same name

If no symbol name is provided, ask the user what symbol they want to analyze.

Call `code_intel` with this code parameter:

```javascript
const result = await api.impactAnalysis({
  symbolName: "<symbol-name>",
  filePath: "<file-path>" || undefined,
  depth: 3
});
return result;
```

**If successful**, present:
1. **Symbol**: Name, kind (function/class/etc), and location
2. **Risk Assessment**: Risk level (low/medium/high/critical) and score
3. **Impact Scope**: Number of files and symbols affected, whether it's a public API
4. **Direct Dependents**: Top 10 files that directly depend on this symbol
5. **Test Coverage**: Percentage from result.data.breakdown.testCoverage
6. **Recommendations**: From result.data.recommendations

**If high or critical risk**, emphasize caution and suggest reviewing dependents before making changes.

**If error**, explain the error and provide guidance from the error response.
