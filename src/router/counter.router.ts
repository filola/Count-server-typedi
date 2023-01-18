import { Router } from "express";
import Container from "typedi";
import { CounterController } from "../controller/counter.controller";
import { CounterRepository } from "../repository/counter.repository";
import { CounterService } from "../service/counter.service";

const counterRouter = Router();

// const _counterRepository = new CounterRepository();
// const _counterService = new CounterService(_counterRepository);
// const _counterController = new CounterController(_counterService);

// counterRouter.get("/", _counterController.home);
// counterRouter.get("/soon", _counterController.soon);
// counterRouter.get("/data/:date", _counterController.dateData);
// counterRouter.get("/lists", _counterController.countList);

const counterController = Container.get(CounterController);

counterRouter.get("/", (req, res, next) => counterController.home(req, res, next));
counterRouter.get("/soon", (req, res, next) => counterController.soon(req, res, next));
counterRouter.get("/data/:date", (req, res, next) => counterController.dateData(req, res, next));
counterRouter.get("/lists", (req, res, next) => counterController.countList(req, res, next));

export default counterRouter;
