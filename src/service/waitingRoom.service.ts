import { ParamsDictionary } from "express-serve-static-core";
import { dateDto } from "../interface/date.interface";
import { WaitingRoomRepository } from "../repository/waitingRoom.repository";

export class WaitingRoomService {
  constructor(private _waitingRoomRepository: WaitingRoomRepository) {}
}
