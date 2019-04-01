import {Request, Response, Router} from "express";
import {HelloWorld} from "./hello-world";
import {Controller} from "./controller";

class HelloWorldController implements Controller {

    private helloWorld: HelloWorld;

    constructor() {
        this.helloWorld = new HelloWorld();
    }

    public routes(router: Router): void {
        router.get("/", async (request: Request, response: Response): Promise<Response> => {
            return response.send(this.helloWorld.text);
        });
        router.get("/withArg/:arg", async (request: Request, response: Response): Promise<Response> => {
            return response.send(request.params.arg + ' - ' + this.helloWorld.text);
        });
    }

}

export default new HelloWorldController();
