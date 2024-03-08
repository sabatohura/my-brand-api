import { config } from "dotenv";
import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";
import mongoose from "mongoose";
import * as supertest from "supertest";
import app from "./../index";
import * as jwt from "jsonwebtoken";
import { loginValidate } from "../utils/validations";
import { appUser } from "../models";

config();

const ENV_DB_CLUSTER_URL = process.env.MONGO_DB_CLUSTER_URI_TEST;
const ENV_DB_PASS = process.env.MONGO_DB_PASSWORD_TEST;
const DB_URI = ENV_DB_CLUSTER_URL.replace("<password>", ENV_DB_PASS);

async function generateJwtToken(user) {
  const valid = loginValidate(user);
  if (!valid.error) {
    const userModel = await appUser.findOne({ email: user.email });
    if (userModel) {
      const payload = {
        email: userModel.email,
        id: userModel._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      return token;
    }
  }
}

beforeAll(async () => {
  await mongoose.connect(DB_URI);
}, 50000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Blog Comment API", () => {
  let blogId = "";
  describe("Get a blog comment", () => {
    it("blog comment found", async () => {
      blogId = "65ca5fdd5aaf79101bfd0213";
      await supertest(app).get(`/api/blogs/${blogId}/comments`).expect(200);
    });
    it("blog comment not found", async () => {
      blogId = "blog-001";
      await supertest(app).get(`/api/blogs/${blogId}/comments`).expect(204);
    });
  });

  // Get all blogs commentshh
  describe("All comments", () => {
    it("un authorized can not get all comments", async () => {
      await supertest(app).get(`/api/comments`).expect(401);
    });

    let user = {};
    describe("only authorized admin can get all comments", () => {
      it("can not get all comments with invalid credentials", async () => {
        const invalidUser = {
          email: "invalid@jest.com",
          password: "invalidpassword",
        };
        const token: string = await generateJwtToken(invalidUser);
        await supertest(app)
          .get(`/api/comments`)
          .set("Authorization", `Bearer ${token}`)
          .expect(401);
      });

      it("get all comments with valid credentials", async () => {
        const validUser = {
          email: "mesabato1235@jest.com",
          password: "1234567xxxx",
        };
        const token: string = await generateJwtToken(validUser);
        await supertest(app)
          .get(`/api/comments`)
          .set("Authorization", `Bearer ${token}`)
          .expect(200);
      });
    });
  });
  
  it("get all comments with valid credentials", async () => {
    const validUser = {
      email: "mesabato1235@jest.com",
      password: "1234567xxxx",
    };
    const token: string = await generateJwtToken(validUser);
    await supertest(app)
      .get(`/api/comments`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  describe("Create a comment", () => {
    let commentContent = {};
    it("blog to comment not found", async () => {
      const blogId = "blog-001";
      await supertest(app)
        .post(`/api/blogs/${blogId}/comment`)
        .send(commentContent)
        .expect(404);
    });
  });
});
