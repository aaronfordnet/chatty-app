const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({
  server
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  const activeUsers = wss.clients.size;
  wss.clients.forEach((client) => {
    const sendUserCount = {
      type: "incomingUserCount",
      activeUsers: activeUsers,
      key: uuidv4()
    }
    client.send(JSON.stringify(sendUserCount));
  });

  ws.on('message', (message) => {
    const msg = JSON.parse(message);
    console.log(msg);

    if (msg.type === "postMessage") {
      msg.type = "incomingMessage";
      msg.key = uuidv4();

      wss.clients.forEach((client) => {
        client.send(JSON.stringify(msg));
      });
    } else if (msg.type === "postNotification") {
      msg.type = "incomingNotification";
      msg.key = uuidv4();

      wss.clients.forEach((client) => {
        client.send(JSON.stringify(msg));
      });
    } else {
      console.error('Error - Invalid message type: ', msg.type);
    }

  });

  ws.on('close', () => {
    console.log('Client disconnected')
    const activeUsers = wss.clients.size;
    wss.clients.forEach((client) => {
      const sendUserCount = {
        type: "incomingUserCount",
        activeUsers: activeUsers,
        key: uuidv4()
      }
      client.send(JSON.stringify(sendUserCount));
    });
  });
});
