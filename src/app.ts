import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());

let waitingUsers: any[] = [995, 996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006];

let enteredUsers = 0;
let count = 994;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello world');
});

app.post('/check', (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  const enterCount = 1000 - count;
  let enter = false;
  const index = waitingUsers.indexOf(userId);
  console.log(index);
  console.log('this2', userId);
  if (enterCount > 0 && index < enterCount && index !== -1) {
    console.log('this', userId);
    // waitingUsers.splice(index, 1);
    enteredUsers++;
    count++;
    enter = true;
  }
  console.log(count);
  console.log('waitingUsers', waitingUsers);
  console.log('enteredUsers', enteredUsers);
  return res.status(200).json({ userId, enter });
});

app.post('/delete', (req: Request, res: Response, next: NextFunction) => {
  for (let i = 0; i < enteredUsers; i++) {
    waitingUsers.shift();
    enteredUsers--;
  }
  console.log('enteredUsers', enteredUsers);
  console.log('waitingUsers', waitingUsers);
  return res.sendStatus(200);
});

app.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;

  if (count <= 999) {
    count++;
    const enter = true;
    console.log(count);
    return res.status(200).json({ enter });
  }

  if (count >= 1000) {
    waitingUsers.push(userId);
    console.log('wait', waitingUsers);
    const enter = false;
    return res.status(200).json({ enter });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT} `);
});
