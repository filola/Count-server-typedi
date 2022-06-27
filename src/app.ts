import express, { Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";
import "dotenv/config";
import cors from "cors";
import { todayCounter } from "./models/index";

const corsOptions = {
  origin: "*",
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const maxUsers = Number(process.env.MAX_USER);
// const waitingUsers: any[] = [995, 996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006];
// const waitingUsers: Array<string> = [];
const waitingUsers: Array<number> = [];
let enteredUsers = 0;
let count = 0;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello world");
});

// waiting disconnect
app.get("/WaitingDisconnect/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  const userIdN = Number(userId);
  waitingUsers.splice(waitingUsers.indexOf(userIdN), 1);

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

    // console.log("==================");
    // console.log(count);
    // console.log(enteredUsers);
    // console.log("==================");

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
    // console.log("entercount", count);
  }

  // console.log("enteredUsers", enteredUsers, "enter", enter);

  return res.status(200).json({ enter });
});

let num = 0;
// First Connect
app.get("/connect", (req: Request, res: Response, next: NextFunction) => {
  // const { userId } = req.body;
  // const userId: string = nanoid(20);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  todayCounter(year + "" + month + "" + day);

  const userId: number = ++num;

  if (count <= maxUsers - 1 && waitingUsers.length == 0) {
    count++;
    const enter = true;

    return res.status(200).json({ enter });
  }

  if (count >= maxUsers || waitingUsers.length > 0) {
    // waitingUsers.push(userId);
    waitingUsers.push(userId);
    // console.log(waitingUsers);
    const enter = false;
    const totalUser = waitingUsers.length;
    return res.status(200).json({ userId, enter, totalUser });
  }
});

const port = Number(process.env.PORT);

app.listen(port, () => {
  console.log(`server listening on port ${port} `);
});
