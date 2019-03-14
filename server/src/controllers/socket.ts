import { io } from '../app';
import { fetch, fetchedQuestions } from '../utils/fetchQuestions';
import * as jwt from '../utils/jwt';

interface Users {
  [prop: string]: string;
}

// Configuration vars
let questionsFetched = false;
let adminLock = true;
let adminId: string = null;
let initialized = false;

// State vars
const users: Users = {};

const connectionFunc = (socket): void => {
  socket.on('adminLogin', (password, cb): void => {
    if (password === process.env.ADMIN_PASSWORD) {
      adminLock = true;
      adminId = socket.id;
      process.stdout.write('Admin LoggedIn: Ready to KickOff\n\n');
      cb(true);
      return null;
    }
    socket.disconnect();
    cb(false);
    return null;
  });
  socket.on('emitQuestion', (cb): void => {
    if (questionsFetched && socket.id === adminId) {
      io.emit('question', fetchedQuestions[0]);
      initialized = true;
      cb(true);
    }
    cb(false);
  });
  socket.on('join', (token, cb): void => {
    let payload: any;
    try {
      payload = jwt.verify(token);
      users[socket.id as string] = payload.username;
      cb(true);
    } catch (err) {
      cb(false);
      socket.disconnect();
    }
  });
  socket.on('disconnect', () => {
    if (socket.id === adminId) {
      adminId = null;
      process.stdout.write('Admin LoggedOut\n\n');
      return null;
    }
    return null;
  });
};

const registerIO = (): void => {
  io.on('connection', connectionFunc);
  fetch(() => {
    questionsFetched = true;
    io.to(adminId).emit('ready');
    process.stdout.write('Questions fetched successfully\n\n');
  });
};

export default registerIO;
