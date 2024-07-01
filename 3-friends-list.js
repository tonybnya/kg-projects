// Project 3 - Friends List

// Using the terminal,
// create your own list of friends, including
// details like their name, age, and phone number.

// You should be able to look up any friends info
// by their name and view it in the terminal.

// Hint: use a map

const readline = require('readline');

const config = {
    input: process.stdin,
    output: process.stdout
}

const rl = readline.createInterface(config);

const friends = new Map();

const prompt = `\nChoose an option:

a. add a friend
r. get a friend
l. list all friends
q. exit

`;

const titleStr = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const addFriend = () => {
    rl.question("\nEnter a friend's data (name, age, and phone number): ", (answer) => {
        const args = answer.trim().split(" ");

        if (args.length < 3 || args.length > 3) {
            console.log('\nProvide a name, an age, and a phone number.\n');
            prompter();
        }

        const [name, age, phoneNumber] = args;
        
        if (name && !isNaN(age) && phoneNumber) {
            friends.set(titleStr(name), { age, phoneNumber });
            prompter();
        } else {
            console.log('Invalid data entered!');
            prompter();
        }
    })
}

const readFriend = () => {
    rl.question("Enter the friend's name: ", (answer) => {
        const friend = friends.get(titleStr(answer));

        if (friend) {
            console.log(`\nInfo for friend: ${titleStr(answer)}`);
            console.log(`name: ${titleStr(answer)}`);
            console.log(`age: ${friend.age}`);
            console.log(`phone number: ${friend.phoneNumber}\n`);
            prompter();
        } else {
            console.log(`\nThere is no friend with this name\n`);
            prompter();
        } 
    })
}

const listFriends = () => {
    if (friends.size === 0) {
        console.log(`\nThe friends list is empty.\n`);
    } else {
        console.log('\n### List of my friends ###\n');
        friends.forEach((value, key) => {
            console.log(`${key}:`);
            console.log(`  Age: ${value.age}`);
            console.log(`  Phone Number: ${value.phoneNumber}\n`);
        });
    }
}

const prompter = () => {
    rl.question(prompt, (answer) => {
        if (answer.toLowerCase() === 'a') {
            addFriend();
        } else if (answer.toLowerCase() === 'l') {
            listFriends(friends);
            prompter();
        } else if (answer.toLowerCase() === 'r') {
            readFriend();
        } else if (answer.toLowerCase() === 'q') {
            console.log('Bye!');
            rl.close();
        } else {
            console.log('Unknown option.');
            prompter();
        }
    })
};

prompter();