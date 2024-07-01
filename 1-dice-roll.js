// Project 1 - Dice roll

// Using a 6 sided die -
// You're going to pick a number, 1 through 6 with each number simulating a side of a die.
// Once you pick a number you will simulate "rolling" the dice 3 times in an attempt
// to roll the number you picked.

// Each time the dice is rolled, output how many times you've rolled the dice
// and the number rolled.

// If the number you roll is greater than the number you picked then output:
// "The dice rolled higher than the number you picked!".

// If the number you roll is less than the number you pick then output:
// "The dice rolled lower than the number you picked!".

// If the number you roll equals the number you picked stop the program and output:
// "The dice rolled the number you picked!".

// If you roll the dice 3 times without landing on your number, stop the program and output:
// "You've ran out of tries to roll the dice"
const rollingDice = () => {
    return Math.floor(Math.random() * 6) + 1;
}

let args = process.argv.slice(2);

if (args.length > 1 || isNaN(args[0]) || args[0] > 6 || args[0] < 1) {
    console.log("Your argument must be one number between 1 and 6.");
    console.log("Retry...");
    process.exit(1);
}

let numberPicked = Number(args[0]);
console.log("\n=== " + numberPicked + " is the number you picked ===\n");

const maxAttempts = 3;
let attempts = 0;
while (true) {
    attempts++;

    console.log("Dice a roll...")

    let diceRolled = rollingDice();
    console.log("The dice rolled is " + diceRolled);

    console.log("You've rolled the dice " + attempts + " time(s).\n");

    if (diceRolled > numberPicked) {
        console.log("The dice rolled higher than the number you picked! (" + diceRolled + " > " + numberPicked + ")\n");
    } else if (diceRolled < numberPicked) {
        console.log("The dice rolled lower than the number you picked! (" + diceRolled + " < " + numberPicked + ")\n");
    } else {
        console.log("The dice rolled the number you picked! (" + diceRolled + " = " + numberPicked + ")\n");
        break;
    }

    if (attempts == maxAttempts) {
        console.log("You've ran out of tries to roll the dice.")
        break;
    }
}