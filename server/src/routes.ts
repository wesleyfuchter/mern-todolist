import {Router} from "express";

import UserController from "./user-controller";
import TaskController from "./task-controller";
import HelloWorldController from "./hello-world-controller";

const routes = Router();

HelloWorldController.routes(routes);
UserController.routes(routes);
TaskController.routes(routes);

export default routes;
