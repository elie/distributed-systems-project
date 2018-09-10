const readline = require('readline');
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// rl.on('line', (input) => {
//   console.log(`Received: ${input}`);
// });
rl.on('SIGINT', () => {
  rl.close();
});

rl.question('>', (input) => {
  //TODO: forward to server
  console.log(input);
  client.send(input, 8888, 'localhost', (err)=> {
    client.close();
  })
})