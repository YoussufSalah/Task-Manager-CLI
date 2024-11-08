# Task Manager CLI App

## How to install (windows, linux or macos)

-   Simply, run `npm run install`

## How to use

-   Usage: `task-cli <command-name> [command-args]`
-   After running the installation command run `task-cli help` to show list of the available commands

## Example

```bash
# Show list of commands:
task-cli help

# Add task:
task-cli add-task "Task title" "Task description (Optional)"

# Update task:
task-cli update-task TASK_0001 "New task title" "New task description (Optional)"

# Delete task:
task-cli delete-task TASK_0001

# Mark task as done:
task-cli mark-done TASK_0001

# Mark task as in-progress:
task-cli marg-in-progress TASK_0001

# List tasks:
task-cli list
task-cli list todo          # Only todo tasks
task-cli list in-progress   # Only in-progress tasks
task-cli list done          # Only done tasks
```

Project from: [Roadmap.sh Task Tracker](https://roadmap.sh/projects/task-tracker)
