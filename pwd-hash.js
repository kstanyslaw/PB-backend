const bcrypt = require('bcrypt');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter password: ', async(password) => {
    const hashedPw = await bcrypt.hash(password, 12);
    console.log(`Hashed password: ${hashedPw}`);

    rl.close();
});