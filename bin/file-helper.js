const fs = require("fs");
const path = require("path");

const { colors } = require("./colors");

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyDirectory(src, dest, nore = []) {
  ensureDirectoryExists(dest);

  const files = fs.readdirSync(src);

  const filesFilter = files.filter((file) => nore.indexOf(file) === -1);

  filesFilter?.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

function fileExists(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}

function getAvailableComponents(templatesDir) {
  if (!fs.existsSync(templatesDir)) {
    return [];
  }

  return fs.readdirSync(templatesDir).filter((item) => {
    return fs.statSync(path.join(templatesDir, item)).isDirectory();
  });
}

function askQuestion(question) {
  return new Promise((resolve) => {
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase().trim());
    });
  });
}

function appendToFile(filePath, content) {
  const pathTarget = "src/macro-ui";
  const targetPath = path.join(process.cwd(), pathTarget, filePath);
  fs.appendFileSync(targetPath, content + "\n", "utf8");
  console.log(`✅ Appended to file: ${filePath}`);
}

function removeStringFromFile(filePath, stringToRemove) {
  const pathTarget = "src/macro-ui";
  const targetPath = path.join(process.cwd(), pathTarget, filePath);
  if (!fs.existsSync(targetPath)) {
    console.log(`❌ File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(targetPath, "utf8");
  const updated = content.replace(stringToRemove, "");

  if (content !== updated) {
    fs.writeFileSync(targetPath, updated, "utf8");
    console.log(`✅ Removed string from file: ${filePath}`);
  } else {
    console.log(`ℹ️ String not found in file: ${filePath}`);
  }
}

function deleteFolder(folderPath) {
  const pathTarget = "src/macro-ui";
  const targetPath = path.join(process.cwd(), pathTarget, filePath);
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
    console.log(colors.green(`🗑️ Deleted folder: ${folderPath}`));
  } else {
    console.log(colors.red(`⚠️ Folder not found: ${folderPath}`));
  }
}

function getExportString(text) {
  return `export * from './${text}';`;
}

module.exports = {
  ensureDirectoryExists,
  copyDirectory,
  fileExists,
  getAvailableComponents,
  askQuestion,
  appendToFile,
  removeStringFromFile,
  deleteFolder,
  getExportString,
};
