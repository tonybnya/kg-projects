// Develop a program that enables users to input student grades
// for multiple classes, using a scale ranging
// from 0 to 100 for each class grade.
// All the data should be stored in an organized data structure,
// enabling users to easily retrieve a report card and the GPA
// for each student.
import fs from 'fs';
import * as readline from "readline";

import { calculateGPA, listStudents, pointsToGrades, titleStr } from "./functions.js";
import { addStudentPrompt, commands, gpaStudentPrompt, prompt, reportStudentPrompt } from "./utils.js";

const saveToFile = (data) => {
    fs.writeFile(studentsFile, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error saving data:', err);
        } else {
            return;
        }
    });
};

const loadFromFile = () => {
    try {
        if (fs.existsSync(studentsFile)) {
            const data = fs.readFileSync(studentsFile, 'utf8');
            return JSON.parse(data) || {};
        } else {
            console.log('Students file does not exist. Initializing with empty data.');
            saveToFile({});
            return {};
        }
    } catch (err) {
        console.error('Error loading data:', err);
        return {};
    }
};

const studentsFile = './students.json'
let students = loadFromFile();

const config = {
    input: process.stdin,
    output: process.stdout
};

const rl = readline.createInterface(config);

const addStudent = () => {
    rl.question(addStudentPrompt, (answer) => {
        const args = answer.split(" ");

        if (!answer || args.length !== 5) {
            console.log("Invalid data.");
            addStudent();
        } else {
            let [name, mathGrade, englishGrade, scienceGrade, historyGrade] = answer.split(" ");
            
            const condition1 = !isNaN(mathGrade) || !isNaN(englishGrade) || !isNaN(scienceGrade) || !isNaN(historyGrade);
            const condition2 = [mathGrade, englishGrade, scienceGrade, historyGrade].every(grade => grade >= 0 && grade <= 100);

            if (condition1 && condition2) {
                name = titleStr(name);

                mathGrade = parseInt(mathGrade);
                englishGrade = parseInt(englishGrade);
                scienceGrade = parseInt(scienceGrade);
                historyGrade = parseInt(historyGrade);

                const grades = {
                    math: pointsToGrades(mathGrade),
                    english: pointsToGrades(englishGrade),
                    science: pointsToGrades(scienceGrade),
                    history: pointsToGrades(historyGrade),
                }

                students[name] = { grades };
                saveToFile(students);
                console.log(`Added ${name}.`)

                launchCommands();
            } else {
                console.log("Student's grades must be numbers between 0 and 100.")
                addStudent();
            }
        }
    });
};

const gpaStudent = () => {
    rl.question(gpaStudentPrompt, (answer) => {
        const name = titleStr(answer);

        if (students.hasOwnProperty(name)) {
            const gpa = calculateGPA(students[name].grades);

            console.log("\n==============================================");
            console.log(`${name} Grade Point Average (GPA): ${gpa}`);
            console.log("==============================================\n");
        } else {
            console.log(`No student: ${answer}.`)
        }

        launchCommands();
    });
};

const reportStudent = () => {
    rl.question(reportStudentPrompt, (answer) => {
        const name = titleStr(answer);

        if (students.hasOwnProperty(name)) {
            console.log(`\n# Report for: ${name}`)
            console.log("=====================");
            console.log(`Math: ${students[name]['grades'].math.grade}`);
            console.log(`English: ${students[name].grades.english.grade}`);
            console.log(`Science: ${students[name].grades.science.grade}`);
            console.log(`History: ${students[name].grades.history.grade}`);
            console.log("=====================");
        } else {
            console.log(`No students: ${answer}`);
        }

        launchCommands();
    });
}

const launchCommands = () => {
    rl.question(commands, (command) => {
        if (command.toLowerCase() === "a") {
            addStudent();
        } else if (command.toLowerCase() === "g") {
            gpaStudent();
        } else if (command.toLowerCase() === "l") {
            if (students) {
                listStudents(students);
            } else {
                console.log("There is no students.");
            }

            launchCommands();
        } else if (command.toLowerCase() === "r") {
            // TODO: show report for a student
            reportStudent();
        } else if (command.toLowerCase() === "q") {
            console.log("\nBye!");
            rl.close();
        } else {
            console.log("Unknown command.");
            launchCommands();
        }
    });
};

const prompter = () => {
    rl.question(prompt, (answer) => {
        if (answer.toLowerCase() === "cmd") {
            launchCommands();
        } else {
            console.log("Please type-in `cmd`.");
            prompter();
        }
    });
};

prompter();