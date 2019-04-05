import {Request, Response, Router} from "express";
import {Controller} from "./controller";
import User from "./user";

class UserController implements Controller {

    public routes(router: Router): void {
        router.get("/users", async (request: Request, response: Response): Promise<Response> => {
            return response.status(200).json(await User.find());
        });
        router.post("/user", async (request: Request, response: Response): Promise<Response> => {
            return response.status(201).json(await User.create(request.body));
        });
        router.put("/user/:id", async (request: Request, response: Response): Promise<Response> => {
            return response.status(200).json(await User.updateOne({_id: request.params.id}, request.body));
        });
        router.delete("/user/:id", async (request: Request, response: Response): Promise<Response> => {
            return response.status(204).json(await User.deleteOne({_id: request.params.id}));
        });
    }

}

export default new UserController();
