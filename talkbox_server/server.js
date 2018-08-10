// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
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
