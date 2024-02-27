import { app } from "../index";
import * as supertest from "supertest";

describe("blogComments Found", () => {
  describe("given the blog does have comments exist ", () => {
    it("should return a 200", async () => {
      const blogId = "65ca5fdd5aaf79101bfd0213";
      await supertest(app).get(`/api/blogs/${blogId}/comments`).expect(200);
    });
  });
});

describe("blogComments not found", () => {
  describe("get blog comments route", () => {
    describe("given the blog comments doesn't exist ", () => {
      it("should return a 404", async () => {
        const blogId = "blog-id";
        await supertest(app).get(`/api/blogs/${blogId}/comments`).expect(400);
      });
    });
  });
});
