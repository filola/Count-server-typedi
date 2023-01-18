import { Router } from "express";
import Container from "typedi";
import { CounterController } from "../controller/counter.controller";
import { CounterRepository } from "../repository/counter.repository";
import { CounterService } from "../service/counter.service";

const counterRouter = Router();

const _counterRepository = new CounterRepository();
const _counterService = new CounterService(_counterRepository);
const _counterController = new CounterController(_counterService);

counterRouter.get("/", _counterController.home);
counterRouter.get("/soon", _counterController.soon);
counterRouter.get("/data/:date", _counterController.dateData);
counterRouter.get("/lists", _counterController.countList);

// const counterController = Container.get(CounterController);

// counterRouter.get("/", counterController.home);
// counterRouter.get("/soon", counterController.soon);
// counterRouter.get("/data/:date");
// counterRouter.get("/lists", counterController.countList);

export default counterRouter;
