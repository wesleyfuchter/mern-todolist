import {Router} from "express";

import UserController from "./user-controller";
import HelloWorldController from "./hello-world-controller";

const routes = Router();

HelloWorldController.routes(routes);
UserController.routes(routes);

export default routes;
