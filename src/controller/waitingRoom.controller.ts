import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import { WaitingRoomService } from "../service/waitingRoom.service";

export class WaitingRoomController {
  constructor(private _waitingRoomService: WaitingRoomService) {}

  disconnect = async (req: Request, res: Response, next: NextFunction) => {};
}
