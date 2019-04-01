import {Request, Response, Router} from "express";
import {Controller} from "./controller";

class UserController implements Controller {

    public routes(router: Router): void {
        router.get("/users", async (request: Request, response: Response): Promise<Response> => {
            return response.json([]);
        });
        router.post("/user", async (request: Request, response: Response): Promise<Response> => {
            return response.json({id: "123"});
        });
    }

}

export default new UserController();
