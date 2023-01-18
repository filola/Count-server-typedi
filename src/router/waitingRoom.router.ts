import { Router } from "express";

const waitingRoomRouter = Router();

waitingRoomRouter.get("/WaitingDisconnect/:userId");
waitingRoomRouter.get("/connect");
waitingRoomRouter.get("/EnterCheck/:userId");

waitingRoomRouter.post("/disconnect");

export default waitingRoomRouter;
