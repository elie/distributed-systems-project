const fs = require('fs');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const PORT = 8888;

server.on('error', err => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  msg = msg.toString();
  const command = msg.split(' ')[0];
  const key = msg.split(' ')[1];
  fs.readFile('./store.json', (err, data) => {
    if (err) console.log('error in reading JSON');
    const store = JSON.parse(data);
    if (command === 'GET') {
      console.log(store[key]);
    } else if (command === 'SET') {
      const value = msg.split(' ')[3];
      store[key] = value;
      fs.writeFile('./store.json', JSON.stringify(store), err => {
        if (err) console.log(err);
        console.log('wrote to json file', store);
      });
    }
  });
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind({
  address: 'localhost',
  port: PORT,
  exclusive: true
});
