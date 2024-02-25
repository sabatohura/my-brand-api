import { app } from "../index";
import * as supertest from "supertest";

describe("blog", () => {
  describe("get blog route", () => {
    describe("given the blog does not exist ", () => {
      it("should return a 404", async () => {
        const blogId = "blog-001";
        await supertest(app).get(`/api/blogs/${blogId}`).expect(404);
      });
    });
  });
});
