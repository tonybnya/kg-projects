export const pointsToGrades = (score) => {
    let notation = {};

    if (score >= 0 && score <= 59) {
        notation.grade = "F";
        notation.points = 0.0;
    } else if (score >= 60 && score <= 62) {
        notation.grade = "D-";
        notation.points = 0.7;
    } else if (score >= 63 && score <= 66) {
        notation.grade = "D";
        notation.points = 1.0;
    } else if (score >= 67 && score <= 69) {
        notation.grade = "D+";
        notation.points = 1.3;
    } else if (score >= 70 && score <= 72) {
        notation.grade = "C-";
        notation.points = 1.7;
    } else if (score >= 73 && score <= 76) {
        notation.grade = "C";
        notation.points = 2.0;
    } else if (score >= 77 && score <= 79) {
        notation.grade = "C+";
        notation.points = 2.3;
    } else if (score >= 80 && score <= 82) {
        notation.grade = "B-";
        notation.points = 2.7;
    } else if (score >= 83 && score <= 86) {
        notation.grade = "B";
        notation.points = 3.0;
    } else if (score >= 87 && score <= 89) {
        notation.grade = "B+";
        notation.points = 3.3;
    } else if (score >= 90 && score <= 92) {
        notation.grade = "A-";
        notation.points = 3.7;
    } else if (score >= 93 && score <= 100) {
        notation.grade = "A";
        notation.points = 4.0;
    } else {
        notation = {};
    }

    return notation;
}

export const titleStr = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const calculateGPA = (grades) => {
    const totalPoints = Object.values(grades).reduce((sum, grade) => sum + grade.points, 0);
    const gpa = totalPoints / Object.keys(grades).length;

    return gpa.toFixed(2);
}

export const listStudents = (students) => {
    const studentNames = Object.keys(students);

    if (studentNames.length === 0) {
        console.log("There are no students added yet.");
    } else {
        console.log("\n# List of all students:")
        console.log("========================");
        for (const name of studentNames) {
            console.log(name);
        }
        console.log("========================");
    }
}