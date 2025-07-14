#!/usr/bin/env node
const { spawn } = require("child_process");
const path = require("path");
const { getComponentByName } = require("./add");
const { colors } = require("./colors");

// Simple argument parser
function parseArgs(args) {
  const result = { command: "", component: "" };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "add" && !result.command) {
      result.command = "add";
      if (args[i + 1] && !args[i + 1].startsWith("-")) {
        result.component = args[i + 1];
        i++;
      }
    } else if (arg === "--help" || arg === "-h") {
      result.command = "help";
    } else if (arg === "--version" || arg === "-v") {
      result.command = "version";
    }
  }

  return result;
}

function showHelp() {
  console.log(`
${colors.blue(
  "macro-ui"
)} - CLI tool for adding React Native components to Expo projects

${colors.yellow("Usage:")}
  macro-ui add <component>

${colors.yellow("Commands:")}
  add <component>    Add a component to your project

${colors.yellow("Options:")}
  -h, --help         Show help
  -v, --version      Show version

${colors.yellow("Examples:")}
  macro-ui add box
  macro-ui add button
  macro-ui add input
`);
}

function showVersion() {
  const packageJson = require("../package.json");
  console.log(packageJson.version);
}

// Main CLI logic
const args = process.argv.slice(2);
const parsed = parseArgs(args);

switch (parsed.command) {
  case "add":
    if (!parsed.component) {
      console.log(colors.red("Error: Component name is required"));
      console.log("Usage: macro-ui add <component>");
      process.exit(1);
    }
    getComponentByName(parsed.component);
    break;
  case "help":
    showHelp();
    break;
  case "version":
    showVersion();
    break;
  default:
    if (args.length === 0) {
      showHelp();
    } else {
      console.log(
        colors.red("Unknown command. Use --help for usage information.")
      );
    }
}
