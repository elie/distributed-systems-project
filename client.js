const readline = require('readline');
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const SERVER_PORT = 8888;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

client.bind({
  address: 'localhost',
  exclusive: true
});

rl.on('SIGINT', () => {
  rl.close();
});

rl.prompt();

rl.on('line', line => {
  client.send(line, SERVER_PORT, 'localhost', err => {
    if (err) {
      console.log(err);
      client.close();
    }
  }); 
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});

client.on('message', (msg, rinfo) => {
  if (rinfo.port === SERVER_PORT) {
    console.log(msg.toString());
    rl.prompt();
  }
});