import { app } from "../index";
import * as supertest from "supertest";

describe("blogComments", () => {
  describe("get blog comments route", () => {
    describe("given the blog does have comments exist ", () => {
      it("should return a 404", async () => {
        const blogId = "65ca5fdd5aaf79101bfd0213";
        await supertest(app).get(`/api/blogs/${blogId}/comments`).expect(404);
      });
    });
  });
});
