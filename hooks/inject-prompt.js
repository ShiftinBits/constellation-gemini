const fs = require("fs");
const path = require("path");

const promptName = process.argv[2];
const eventName = process.argv[3];
const decision = process.argv[4] || "approve";

if (!promptName || !eventName) {
  process.exit(1);
}

const promptPath = path.join(__dirname, "prompts", `${promptName}.txt`);
try {
  const content = fs.readFileSync(promptPath, "utf8").trim();
  const output = {
    decision: decision,
    hookSpecificOutput: {
      hookEventName: eventName,
      additionalContext: content,
    },
  };

  process.stdout.write(JSON.stringify(output));
} catch (err) {
  process.stderr.write(`Error reading prompt ${promptName}: ${err.message}\n`);
  process.exit(1);
}
