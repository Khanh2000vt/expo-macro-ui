const fs = require("fs");
const path = require("path");
const { colors } = require("./colors");
const {
  ensureDirectoryExists,
  copyDirectory,
  fileExists,
  getAvailableComponents,
  askQuestion,
} = require("./file-helper");

const basePath = "src/macro-ui";

async function addCommand(componentName, nore = []) {
  const pathTarget = "src/macro-ui";
  try {
    console.log(colors.blue(`Adding ${componentName} component...`));

    // Kiểm tra component có tồn tại không
    const templatePath = path.join(__dirname, "..", "templates", componentName);

    if (!fs.existsSync(templatePath)) {
      console.log(colors.red(`Component "${componentName}" not found!`));
      return;
    }

    // Tạo thư mục đích
    const targetPath = path.join(process.cwd(), pathTarget, componentName);
    ensureDirectoryExists(path.dirname(targetPath));

    // Kiểm tra nếu component đã tồn tại
    if (fileExists(targetPath)) {
      const answer = await askQuestion(
        colors.yellow(
          `Component "${componentName}" already exists. Overwrite? (y/N): `
        )
      );

      if (answer !== "y" && answer !== "yes") {
        console.log(colors.yellow("Operation cancelled."));
        return;
      }

      // Xóa thư mục cũ
      fs.rmSync(targetPath, { recursive: true, force: true });
    }

    // Copy template files
    copyDirectory(templatePath, targetPath, nore);

    console.log(
      colors.green(
        `✓ Added ${componentName} component to ${path}/${componentName}`
      )
    );
    console.log(
      colors.blue(
        `You can now import it: import { ${componentName} } from './${pathTarget}/${componentName}';`
      )
    );
  } catch (error) {
    console.error(colors.red("Error adding component:"), error.message);
  }
}

async function addAll() {
  const templatesDir = path.join(__dirname, "..", "templates");
  const availableComponents = getAvailableComponents(templatesDir);
  if (availableComponents.length === 0) {
    console.log(colors.red("No components available to add"));
    return;
  }
  const answer = await askQuestion(
    colors.yellow(`Add all ${availableComponents.length} components? (y/N): `)
  );

  if (answer !== "y" && answer !== "yes") {
    console.log(colors.yellow("Operation cancelled."));
    return;
  }

  // Add each component
  for (const comp of availableComponents) {
    console.log(colors.blue(`Adding ${comp}...`));

    const templatePath = path.join(__dirname, "..", "templates", comp);
    const targetPath = path.join(process.cwd(), basePath, comp);

    // Ensure directory exists
    ensureDirectoryExists(path.dirname(targetPath));

    // Remove existing if exists
    if (fileExists(targetPath)) {
      fs.rmSync(targetPath, { recursive: true, force: true });
    }

    // Copy template
    copyDirectory(templatePath, targetPath);
    console.log(colors.green(`  ✓ Added ${comp}`));
  }
}

async function addInit() {
  addCommand("themes");
  addCommand("global", ["GlobalLoading"]);
  addCommand("layout");
  addCommand("utils");
  addCommand("typography", ["TextTickerApp"]);
}

async function getComponentByName(componentName) {
  switch (componentName) {
    case "all":
      addAll();
      break;
    case "init":
      addInit();
      break;
    case "text-ticker":
      addCommand("typography/TextTickerApp");
      break;
    case "media":
      addCommand("media");
      break;
    case "avatar":
      addCommand("components/Avatar");
      break;
    case "badge":
      addCommand("components/Badge");
      break;
    case "button":
      addCommand("components/PressableApp");
      addCommand("components/ButtonApp");
      addCommand("common/ActivityIndicatorApp");
      break;
    case "card":
      addCommand("components/Card");
      break;
    case "card-box":
      addCommand("components/CardBox");
      break;
    case "checkbox":
      addCommand("components/Checkbox");
      addCommand("common/CheckboxIcon");
      break;
    case "collapsible":
      addCommand("components/Collapsible");
      break;
    case "empty":
      addCommand("components/EmptyState");
      break;
    case "error":
      addCommand("components/ErrorState");
      break;
    case "input":
      addCommand("components/InputApp");
      addCommand("common/Editable");
      break;
    case "modal":
      addCommand("components/ModalApp");
      break;
    case "pressable":
      addCommand("components/PressableApp");
      break;
    case "progress-circle":
      addCommand("components/ProgressCircle");
      break;
    case "radio":
      addCommand("components/Radio");
      addCommand("common/RadioIcon");
      break;
    case "scroll-page":
      addCommand("components/ScrollPage");
      addCommand("components/ActivityIndicatorApp");
      break;
    case "select":
      addCommand("components/Select");
      addCommand("components/Separator");
      addCommand("components/EmptyState");
      break;
    case "separator":
      addCommand("components/Separator");
      break;
    case "switch":
      addCommand("components/Switch");
      addCommand("common/SwitchIcon");
      addCommand("components/PressableApp");
      break;
    case "tab":
      addCommand("components/Tabs");
      addCommand("common/ActivityIndicatorApp");
      addCommand("common/TabBar");
      break;
    case "textarea":
      addCommand("components/Textarea");
      addCommand("common/Editable");
      break;
    case "touchable":
      addCommand("components/TouchableApp");
      break;
    case "forms":
      addCommand("forms");
    case "media":
      addCommand("media");
      break;
    case "global-loading":
      addCommand("global/GlobalLoading");
      break;
    default:
      console.log(colors.red(`Component "${componentName}" not found!`));
      break;
  }
}

module.exports = { getComponentByName };
