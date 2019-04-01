import req from "supertest";
import server from "./server";

test("[POST] /user", async () => {
    const res = await req(server).post("/user");
    expect(res.body).toEqual({"id": "123"});
});

test("[GET] /users", async () => {
    const res = await req(server).get("/users");
    expect(res.body).toEqual([]);
});

