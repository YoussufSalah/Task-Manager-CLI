const { isId, findById } = require("./helpers.js");
const {
    addTask,
    updateTask,
    deleteTask,
    list,
    markInProgress,
    markDone,
    showHelp,
} = require("./functions.js");

let argv = process.argv.slice(2);
let command = argv[0];
let args = argv.slice(1);

function main() {
    let index = findById(args[0]),
        isFirstArgAndId = isId(args[0]);

    switch (command) {
        case "add-task":
            if (!args[0]) {
                console.error("Task title is required!");
                return;
            }
            addTask(args[0], args[1]);
            break;
        case "update-task":
            if (!args[0] || !isFirstArgAndId) {
                console.error("Task id is invalid or not provided!");
                break;
            }

            if (index === -1) {
                console.error("Task not found!");
                break;
            }

            if (!args[1]) {
                console.error("New task title is required!");
                break;
            }

            updateTask(index, args[1], args[2]);
            break;
        case "delete-task":
            if (!args[0] || !isFirstArgAndId) {
                console.error("Task id is invalid or not provided!");
                return;
            }

            if (index === -1) {
                console.error("Task not found!");
                return;
            }

            deleteTask(index);
            break;
        case "list":
            if (args[0]) list(args[0]);
            else list();
            break;
        case "mark-done":
            if (!args[0] || !isFirstArgAndId) {
                console.error("Task id is invalid or not provided!");
                return;
            }

            if (index === -1) {
                console.error("Task not found!");
                return;
            }

            markDone(index);
            break;
        case "mark-in-progress":
            if (!args[0] || !isFirstArgAndId) {
                console.error("Task id is invalid or not provided!");
                return;
            }

            if (index === -1) {
                console.error("Task not found!");
                return;
            }

            markInProgress(index);
            break;
        case "help":
            showHelp();
            break;
        default:
            console.error(
                "Invalid command, try `help` to get list of the available commands."
            );
            break;
    }
    return 0;
}

main();