import {Router} from "express";

export interface Controller {

    routes(router: Router): void;

}
