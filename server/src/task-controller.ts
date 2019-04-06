import {Request, Response, Router} from "express";
import {Controller} from "./controller";
import Task from "./task";

class TaskController implements Controller {

    public routes(router: Router): void {
        router.get("/tasks", async (request: Request, response: Response): Promise<Response> => {
            return response.status(200).json(await Task.find());
        });
        router.post("/tasks", async (request: Request, response: Response): Promise<Response> => {
            return response.status(201).json(await Task.create(request.body));
        });
        router.put("/tasks/:id", async (request: Request, response: Response): Promise<Response> => {
            await Task.updateOne({_id: request.params.id}, request.body);
            return response.status(200).json(request.body);
        });
        router.delete("/tasks/:id", async (request: Request, response: Response): Promise<Response> => {
            return response.status(204).json(await Task.deleteOne({_id: request.params.id}));
        });
    }

}

export default new TaskController();
