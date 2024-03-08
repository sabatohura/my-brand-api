import { config } from "dotenv";
import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";
import mongoose from "mongoose";
import * as supertest from "supertest";
import app from "./../index";
config();

const ENV_DB_CLUSTER_URL = process.env.MONGO_DB_CLUSTER_URI_TEST;
const ENV_DB_PASS = process.env.MONGO_DB_PASSWORD_TEST;
const DB_URI = ENV_DB_CLUSTER_URL.replace("<password>", ENV_DB_PASS);

beforeAll(async () => {
  await mongoose.connect(DB_URI);
}, 50000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Testing API", () => {
  it("/api/* for 404", async () => {
    await supertest(app).get("/api/*").expect(404);
  });
});

describe("Blog API", () => {
  describe("GetBlog Api", () => {
    describe("Get All Blogs", () => {
      it("All blogs found (200)", async () => {
        await supertest(app).get("/api/blogs").expect(200);
      });
    });

    describe("Get Single Blog", () => {
      it("no blog found 404", async () => {
        const blogId = "blog-001";
        await supertest(app).get(`/api/blogs/${blogId}`).expect(404);
      });
    });

    describe("Get Single Blog", () => {
      it("no blog found 404", async () => {
        const blogId = "65ca5fdd5aaf79101bfd0213";
        await supertest(app).get(`/api/blogs/${blogId}`).expect(404);
      });
    });

    describe("create a blog", () => {
      it("can not create a blog without picture", async () => {
        let blogObj = {
          title: "this is a blog title for testing",
          content: "This is a blog content for testing",
        };
        await supertest(app).post("/api/blogs").send(blogObj).expect(401);
      });
    });
  });
});
