// Project 2 - Todo List

// Using arrays, objects, and functions
// create a program that stores tasks in a todo list.
// Users should be able to mark each task as "completed".

const readline = require('readline');

const config = {
    input: process.stdin,
    output: process.stdout
}

const rl = readline.createInterface(config);
const options = `a. add a task
c. complete a task
q. quit`;
const todolist = [];

const completeTask = () => {
    rl.question("Choose the ID of the task to mark as completed: ", (id) => {
        id = Number(id);

        if (todolist.length === 0) {
            console.log("There is no task to complete.");
            rl.close();
        } else if (isNaN(id) || id < 0 || id > todolist.length) {
            console.log("Please enter a valid ID")
            completeTask();
        } else {
            todolist[id - 1].completed = true;
            console.log(todolist);
            rl.close();
        }
    })
}

const prompter = () => {
    rl.question("Enter a task (c to complete a task, q to quit): ", (desc) => {
        let n = todolist.length;

        if (desc.toLowerCase() === 'q') {
            console.log(todolist);
            rl.close();
        } else if (desc.toLowerCase() === 'c') {
            completeTask();
        } else {
            const task = {
                id: n + 1,
                description: desc,
                completed: false
            }
            todolist.push(task);
            prompter();
        }
    })
}

prompter();