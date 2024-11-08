const fs = require("fs");
const path = require("path");
const os = require("os");

const platform = os.platform();
let execName;

switch (platform) {
    case "win32":
        execName = "task-cli-win.exe";
        break;
    case "linux":
        execName = "task-cli-linux";
        break;
    case "darwin":
        execName = "task-cli-macos";
        break;
    default:
        console.error("Unsupported platform:", platform);
        process.exit(1);
}

// Path to the correct executable in the `dist` folder
const execPath = path.join(process.cwd(), "dist", execName);

// Define the target global installation path
const globalPath =
    platform === "win32"
        ? path.join("C:\\", "task-cli", execName)
        : "/usr/local/bin/task-cli";

// Ensure the destination directory exists on Windows
if (platform === "win32" && !fs.existsSync(path.dirname(globalPath))) {
    fs.mkdirSync(path.dirname(globalPath), { recursive: true });
}

// Copy the executable to the global path
try {
    fs.copyFileSync(execPath, globalPath);
    if (platform !== "win32") {
        fs.chmodSync(globalPath, 0o755); // Make it executable on macOS/Linux
    }
    console.log(
        "Task CLI installed globally!, type `task-cli help` for command list."
    );
} catch (error) {
    console.error("Failed to install Task CLI globally:", error);
}
