const fs = require("fs");
const path = require("path");
const { colors } = require("./colors");
const {
  ensureDirectoryExists,
  copyDirectory,
  fileExists,
  getExportString,
  askQuestion,
  removeStringFromFile,
  appendToFile,
} = require("./file-helper");

const basePath = "src/macro-ui";

async function addCommand(componentName, nore = []) {
  try {
    console.log(colors.blue(`Adding ${componentName} component...`));

    // Kiểm tra component có tồn tại không
    const templatePath = path.join(__dirname, "..", "templates", componentName);

    if (!fs.existsSync(templatePath)) {
      console.log(colors.red(`Component "${componentName}" not found!`));
      return;
    }

    // Tạo thư mục đích
    const targetPath = path.join(process.cwd(), basePath, componentName);
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
  } catch (error) {
    console.error(colors.red("Error adding component:"), error.message);
  }
}

async function addAll() {
  try {
    const templatePath = path.join(__dirname, "..", "templates");

    if (!fs.existsSync(templatePath)) {
      console.log(colors.red(`Component "${componentName}" not found!`));
      return;
    }

    const targetPath = path.join(process.cwd(), basePath);
    ensureDirectoryExists(path.dirname(targetPath));

    if (fileExists(targetPath)) {
      const answer = await askQuestion(
        colors.yellow(`Component macro-ui already exists. Overwrite? (y/N): `)
      );

      if (answer !== "y" && answer !== "yes") {
        console.log(colors.yellow("Operation cancelled."));
        return;
      }
      // Xóa thư mục cũ
      fs.rmSync(targetPath, { recursive: true, force: true });
    }
    copyDirectory(templatePath, targetPath, nore);
    console.log(
      colors.green(`✓ Added macro-ui component to ${path}/${componentName}`)
    );
  } catch (error) {
    console.error(colors.red("Error adding component:"), error.message);
  }
}

async function getComponentByName(componentName) {
  switch (componentName) {
    case "all":
      addAll();
      break;
    case "init":
      addCommand("themes");
      addCommand("global");
      addCommand("layout");
      addCommand("utils");
      addCommand("typography", ["TextTickerApp"]);
      removeStringFromFile(
        "typography/index.ts",
        getExportString("TextTickerApp")
      );
      break;
    case "text_ticker":
      addCommand("typography/TextTickerApp");
      appendToFile("typography/index.ts", getExportString("TextTickerApp"));
      break;
    case "media":
    case "image":
      addCommand("media");
      break;
    case "avatar":
      addCommand("components/Avatar");
      appendToFile("components/index.ts", getExportString("Avatar"));
      break;
    case "badge":
      addCommand("components/Badge");
      appendToFile("components/index.ts", getExportString("Badge"));
      break;
    case "blur":
      addCommand("components/BlurApp");
      appendToFile("components/index.ts", getExportString("BlurApp"));
      break;
    case "button":
      addCommand("components/ButtonApp");
      appendToFile("components/index.ts", getExportString("ButtonApp"));
      break;
    case "card":
      addCommand("components/Card");
      appendToFile("components/index.ts", getExportString("Card"));
      break;
    case "card_box":
      addCommand("components/CardBox");
      appendToFile("components/index.ts", getExportString("CardBox"));

      break;
    case "checkbox":
      addCommand("components/Checkbox");
      addCommand("common/CheckboxIcon");
      appendToFile("components/index.ts", getExportString("Checkbox"));
      appendToFile("common/index.ts", getExportString("CheckboxIcon"));
      break;
    case "circle":
      addCommand("components/Circle");
      appendToFile("components/index.ts", getExportString("Circle"));
      break;
    case "collapsible":
      addCommand("components/Collapsible");
      addCommand("common/CaretAnimatedRotate");
      appendToFile("components/index.ts", getExportString("Collapsible"));
      appendToFile("common/index.ts", getExportString("CaretAnimatedRotate"));
      break;
    case "empty_state":
      addCommand("components/EmptyState");
      appendToFile("components/index.ts", getExportString("EmptyState"));
      break;
    case "error_state":
      addCommand("components/ErrorState");
      appendToFile("components/index.ts", getExportString("ErrorState"));
      break;
    case "input":
      addCommand("components/InputApp");
      addCommand("common/Editable");
      addCommand("common/ButtonClearForm");
      appendToFile("components/index.ts", getExportString("InputApp"));
      appendToFile("common/index.ts", getExportString("Editable"));
      appendToFile("common/index.ts", getExportString("ButtonClearForm"));
      break;
    case "modal":
      addCommand("components/ModalApp");
      appendToFile("components/index.ts", getExportString("ModalApp"));
      break;
    case "parallax_scroll":
      addCommand("components/ParallaxScrollView");
      appendToFile(
        "components/index.ts",
        getExportString("ParallaxScrollView")
      );
      break;
    case "pressable":
      addCommand("components/PressableApp");
      appendToFile("components/index.ts", getExportString("PressableApp"));
      break;
    case "progress_circle":
      addCommand("components/ProgressCircle");
      appendToFile("components/index.ts", getExportString("ProgressCircle"));
      break;
    case "radio":
      addCommand("components/Radio");
      addCommand("common/RadioIcon");
      appendToFile("components/index.ts", getExportString("Radio"));
      appendToFile("common/index.ts", getExportString("RadioIcon"));
      break;
    case "scroll_page":
      addCommand("components/ScrollPage");
      appendToFile("components/index.ts", getExportString("ScrollPage"));
      break;
    case "select":
      addCommand("components/Select");
      addCommand("common/HeaderSheet");
      addCommand("common/ItemSelect");
      addCommand("common/SelectBox");
      appendToFile("components/index.ts", getExportString("Select"));
      appendToFile("common/index.ts", getExportString("HeaderSheet"));
      appendToFile("common/index.ts", getExportString("ItemSelect"));
      appendToFile("common/index.ts", getExportString("SelectBox"));
      break;
    case "separator":
      addCommand("components/Separator");
      appendToFile("components/index.ts", getExportString("Separator"));
      break;
    case "switch":
      addCommand("components/Switch");
      addCommand("common/SwitchIcon");
      appendToFile("components/index.ts", getExportString("Switch"));
      appendToFile("common/index.ts", getExportString("SwitchIcon"));
      break;
    case "tabs":
      addCommand("components/Tabs");
      addCommand("common/TabBar");
      appendToFile("components/index.ts", getExportString("Tabs"));
      appendToFile("common/index.ts", getExportString("TabBar"));
      break;
    case "textarea":
      addCommand("components/Textarea");
      addCommand("common/Editable");
      addCommand("common/ButtonClearForm");
      appendToFile("components/index.ts", getExportString("Textarea"));
      appendToFile("common/index.ts", getExportString("Editable"));
      appendToFile("common/index.ts", getExportString("ButtonClearForm"));
      break;
    case "touchable":
      addCommand("components/TouchableApp");
      appendToFile("components/index.ts", getExportString("TouchableApp"));
      break;
    case "activity_indicator":
      addCommand("common/ActivityIndicatorApp");
      appendToFile("common/index.ts", getExportString("ActivityIndicatorApp"));
      break;
    case "bottom_sheet":
      addCommand("common/BottomSheetApp");
      appendToFile("common/index.ts", getExportString("BottomSheetApp"));
      break;
    case "forms":
      addCommand("forms");
    default:
      console.log(colors.red(`Component "${componentName}" not found!`));
      break;
  }
}

module.exports = { getComponentByName };
