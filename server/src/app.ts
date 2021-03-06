import * as http from 'http';

import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as socketIO from 'socket.io';
import * as mongoose from 'mongoose';

import env from './env';

import registerIO from './controllers/socket';
import UserRouter from './controllers/user';

const app = Express();
const server = http.createServer(app);
const io = socketIO(server);

env();
registerIO();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'content-type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/', UserRouter);

process.on('uncaughtException', (err: Error) => {
  process.stderr.write(`${err.toString()}\n`);
});

process.on('unhandledRejection', (reason: string, p: any) => {
  process.stderr.write(`Unhandled rejection at: ${p}, Reason: ${reason}`);
});

(mongoose as any).Promise = global.Promise;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err: Error) => {
  if (err) {
    process.stderr.write(err.toString());
    process.exit(1);
  }
  process.stdout.write('Connected to mongodb\n');
});

server.listen(process.env.PORT, () => {
  process.stdout.write(`Listening on port: ${process.env.PORT}\n`);
});

export { io };
