const { mark, writeData, printTasks } = require("./helpers.js");
const tasks = require("./tasks.js");

// @usage task-cli add-task <task-title> [task-description]
function addTask(taskTitle, taskDescription = "") {
    let n = tasks.length;
    let taskId = `TASK_${n < 1000 ? "0" : ""}${n < 100 ? "0" : ""}${
        n < 10 ? "0" : ""
    }${n + 1}`;
    tasks.push({
        id: taskId,
        title: taskTitle,
        description: taskDescription,
        status: "todo",
        createdAt: Math.floor(Date.now() / 1000),
        updatedAt: Math.floor(Date.now() / 1000),
    });
    writeData();
    console.log(`Task added successfully! (id: ${taskId})`);
    return;
}

// @usage task-cli update-task <task-id> <new-task-title> [new-task-description]
function updateTask(index, newTaskTitle, newTaskDescription = "") {
    tasks[index].updatedAt = Math.floor(Date.now() / 1000);
    tasks[index].title = newTaskTitle;
    if (newTaskDescription) tasks[index].description = newTaskDescription;

    writeData();
    console.log(`Task updated successfully! (id: ${tasks[index].id})`);

    return;
}

// @usage task-cli delete-task <task-id>
function deleteTask(index) {
    let task = tasks[index];
    tasks.splice(index, 1);
    writeData();
    console.log(`Task deleted successfully! (id: ${task.id})`);
    return;
}

// @usage task-cli list [list-type]
function list(type = "") {
    if (!type) {
        console.log("Here's a list of ALL tasks:");
        printTasks(tasks);
    } else {
        console.log(`Here's a list of ${type.toUpperCase()} tasks:`);
        printTasks(tasks.filter((task) => task.status === type));
    }
}

// @usage task-cli mark-in-progress <task-id>
function markInProgress(index) {
    mark(index, "in-progress");
}

// @usage task-cli mark-done <task-id>
function markDone(index) {
    mark(index, "done");
}

// @usage task-cli help
function showHelp() {
    console.log(`<=== List of commands ===>
    - add-task <task-title> [task-description]                          => Adds a new task
    - update-task <task-id> <new-task-title> [new-task-description]     => Updates a task by its id
    - delete-task <task-id>                                             => Delete a task by its id
    - list [status]                                                     => List all tasks or tasks with specific status
    - mark-done <task-id>                                               => Marks a task as done by its id
    - mark-in-progress <task-id>                                        => Marks a task as in-progress by its id
<=== Notes ===>
    - Any argument between <> is mandatory.
    - Any argument between [] is optional.`);
}

module.exports = {
    addTask,
    updateTask,
    deleteTask,
    list,
    markInProgress,
    markDone,
    showHelp,
};
