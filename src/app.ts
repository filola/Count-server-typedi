import express, { Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";
import "dotenv/config";

const app = express();
app.use(express.json());

const maxUsers = 1000;
// const waitingUsers: any[] = [995, 996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006];
// const waitingUsers: Array<string> = [];
const waitingUsers: Array<number> = [];
let enteredUsers = 0;
let count = 1000;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello world");
});

// app.post('/userCountCheck', (req: Request, res: Response, next: NextFunction) => {
//   const { userId } = req.body;
//   const enterCount = maxUsers - count;
//   // const enterCount = maxUsers - waitingUsers.count();
//   let enter = false;
//   const index = waitingUsers.indexOf(userId);

//   console.log(index);
//   console.log('this2', userId);

//   if (enterCount > 0 && index < enterCount && index !== -1) {
//     console.log('this', userId);
//     // waitingUsers.splice(index, 1);
//     enteredUsers++;
//     count++;
//     enter = true;
//   }

//   console.log(count);
//   console.log('waitingUsers', waitingUsers);
//   console.log('enteredUsers', enteredUsers);

//   return res.status(200).json({ userId, enter });
// });

// app.post('/delete', (req: Request, res: Response, next: NextFunction) => {
//   for (let i = 0; i < enteredUsers; i++) {
//     waitingUsers.shift();
//     enteredUsers--;
//   }
//   console.log('enteredUsers', enteredUsers);
//   console.log('waitingUsers', waitingUsers);
//   return res.sendStatus(200);
// });

// waiting disconnect

app.post("/WaitingDisconnect", (req: Request, res: Response) => {
  const userId = req.body.userId;
  waitingUsers.splice(waitingUsers.indexOf(userId), 1);

  return res.sendStatus(200);
});

// disconnect
app.post("/disconnect", (req: Request, res: Response) => {
  if (count !== 0) {
    count--;

    // 들어갈 수 있는 사용자수가 Max를 넘지 않도록
    if (enteredUsers < maxUsers) {
      enteredUsers++;
    }

    console.log("==================");
    console.log(count);
    console.log(enteredUsers);
    console.log("==================");

    return res.status(200).json({ enteredUsers });
  }
  return res.sendStatus(400);
});

// Enter room from waiting room
app.get("/EnterCheck/:userId", (req: Request, res: Response, next: NextFunction) => {
  // const userId = req.body.userId;
  const { userId } = req.params;
  const userIdN = Number(userId);

  const index = waitingUsers.indexOf(userIdN);
  const enterCount = enteredUsers;

  let enter = false;

  if (enterCount > 0 && index <= enterCount - 1 && index !== -1 && count < maxUsers) {
    count++;
    enteredUsers--;
    waitingUsers.splice(waitingUsers.indexOf(userIdN), 1);
    enter = true;
    console.log("entercount", count);
  }

  // console.log("enteredUsers", enteredUsers, "enter", enter);

  return res.status(200).json({ enter });
});

let num = 0;
// First Connect
app.get("/connect", (req: Request, res: Response, next: NextFunction) => {
  // const { userId } = req.body;
  // const userId: string = nanoid(20);
  const userId: number = ++num;

  if (count <= maxUsers - 1 && waitingUsers.length == 0) {
    count++;
    const enter = true;

    return res.status(200).json({ enter });
  }

  if (count >= maxUsers || waitingUsers.length > 0) {
    // waitingUsers.push(userId);
    waitingUsers.push(userId);
    console.log(waitingUsers);
    const enter = false;
    const totalUser = count + waitingUsers.length;
    console.log(totalUser);
    return res.status(200).json({ userId });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT} `);
});
