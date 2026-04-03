import 'dotenv/config';
import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';

const wss = new WebSocketServer({ port: 8080 });
const JWT_SECRET = process.env.JWT_SECRET || '';
wss.on('connection', (ws: WebSocket, req) => {
  const url = req.url;
  if (!url) return;
  const queryparams = new URLSearchParams(url.split('?')[1]);
  const token = queryparams.get('token') || '';

  const decoded = jwt.verify(token, JWT_SECRET);

  if ( typeof decoded == "string"){
	  ws.close();
	  return;
  }

  if (!decoded || !(decoded as JwtPayload).userId) {
    ws.close();
    return;
  }

  ws.on('error', console.error);

  ws.on('open', () => {
    ws.send('Hello from a WebSocket Server !!');
  });

  ws.on('message', (data) => {
    console.log(`Received ${data}`);
  });
});
