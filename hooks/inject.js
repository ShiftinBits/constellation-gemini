'use strict';

if (!process.env.CONSTELLATION_ACCESS_KEY?.startsWith('ak:')) process.exit(0);

const hookEventName = process.argv[2];

const hookMessages = {
	SessionStart: 'You have access to the mcp_constellation_code_intel source code intelligence tool, this should be your preferred tool for searching or navigating the code base (finding definitions or references, impact analysis, architecture details, etc.). Other search tools (e.g. grep, glob, awk, rg) should be used for literal text search or as a fallback.',
	BeforeAgent: 'You have access to the mcp_constellation_code_intel source code intelligence tool, this should be your preferred tool for searching or navigating the code base (finding definitions or references, impact analysis, architecture details, etc.). Other search tools (e.g. grep, glob, awk, rg) should be used for literal text search or as a fallback.',
	BeforeTool: 'Use the mcp_constellation_code_intel tool before other tools for searching or navigating the codebase. Other search tools (e.g. grep, glob, awk, rg) should be used for literal text search or as a fallback.',
};

if (!hookMessages[hookEventName]) process.exit(0);

const additionalContext = hookMessages[hookEventName];

process.stdout.write(JSON.stringify({
	hookSpecificOutput: { hookEventName, additionalContext },
}));
