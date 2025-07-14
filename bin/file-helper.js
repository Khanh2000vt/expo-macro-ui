const fs = require("fs");
const path = require("path");

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

module.exports = {
  ensureDirectoryExists,
  copyDirectory,
  fileExists,
  getAvailableComponents,
  askQuestion,
};
