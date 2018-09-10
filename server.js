const repl = require('repl');

const msg = 'Set key value pair';

const r = repl.start('> ');
Object.defineProperty(r.context, 'SET', {
  configurable: false,
  enumerable: true,
  value: msg
});

Object.defineProperty(r.context, 'GET', {
  configurable: false,
  enumerable: true,
  value: 'GET value'
});

// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(`Thank you for your valuable feedback: ${answer}`);

//   rl.close();
// });