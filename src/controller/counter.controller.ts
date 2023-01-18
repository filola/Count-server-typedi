import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import { CounterService } from "../service/counter.service";

@Service()
export class CounterController {
  constructor(private _counterService: CounterService) {}

  home = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await this._counterService.home());
    } catch (error) {
      return error;
    }
  };

  soon = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await this._counterService.soon());
    } catch (error) {
      return error;
    }
  };

  dateData = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(await this._counterService.dateData(req.params));
  };

  countList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await this._counterService.list());
    } catch (error) {
      return error;
    }
  };
}
