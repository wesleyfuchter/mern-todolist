import req from "supertest";
import server from "./server";

test("[GET] /", async () => {
    const res = await req(server).get("/");
    expect(res.text).toBe("Hello, World!");
});

test("[GET] /1 with arg", async () => {
    const res = await req(server).get("/withArg/1");
    expect(res.text).toBe("1 - Hello, World!");
});
