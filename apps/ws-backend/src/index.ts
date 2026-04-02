import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws: WebSocket) => {
  console.log('Client Connected');
  ws.on('error', console.error);

  ws.on('open', () => {
    ws.send('Hello from a WebSocket Server !!');
  });

  ws.on('message', (data) => {
    console.log(`Received ${data}`);
  });
});
