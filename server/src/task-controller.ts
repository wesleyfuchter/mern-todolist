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
            return response.status(200).json(await Task.updateOne({_id: request.params.id}, request.body));
        });
        router.put("/tasks/:id/markAsDone", async (request: Request, response: Response): Promise<Response> => {
            const task = await Task.findById(request.params.id);
            if (task) {
                return response.status(200).json(await Task.updateOne({_id: request.params.id}, {done: true, ...task}));
            }
            return response.status(404);
        });
        router.put("/tasks/:id/markAsTodo", async (request: Request, response: Response): Promise<Response> => {
            const task = await Task.findById(request.params.id);
            if (task) {
                return response.status(200).json(await Task.updateOne({_id: request.params.id}, {done: false, ...task}));
            }
            return response.status(404);
        });
        router.delete("/tasks/:id", async (request: Request, response: Response): Promise<Response> => {
            return response.status(204).json(await Task.deleteOne({_id: request.params.id}));
        });
    }

}

export default new TaskController();
