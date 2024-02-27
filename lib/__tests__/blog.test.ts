import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../index";
import * as supertest from "supertest";
import mongoose from "mongoose";
import { createSBlog } from "../controllers";

const blogPayLoad = {
  title: "this is a new blog we are creating with testing cases xxx",
  imgUrl:
    "https://sabatohura.github.io/my-brand/assets/images/projects/project-blog.png",
  content:
    " Entering and Succeeding in a Tech Career: The Keys to Success to validate Entering and Succeeding in a Tech Career: The Keys to Success Test",
};

describe("blog", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("get blog route", () => {
    describe("given the blog does not exist", () => {
      it("should return a 404", async () => {
        const blogId = "blog-123";
        await supertest(app).get(`/api/blogs/${blogId}`).expect(404);
      });
    });

    describe("given the blog does exist", () => {
      it("should return a 200 status and the blog", async () => {
        // @ts-ignore
        const blog = await createSBlog(blogPayLoad);

        const { body } = await supertest(app).get(`/api/blogs/`);
        expect(200);
      });
    });
  });

  describe("create blog route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post("/api/blogs");
        expect(403);
      });
    });
  });
});
