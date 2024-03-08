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

describe("User API", () => {
  describe("Create Account", () => {
    it("successfull Create validated account", async () => {
      const userPayload = {
        fullNames: "Sabato Jest",
        email: "mesabato1235@jest.com",
        password: "1234567xxxx",
      };
      await supertest(app)
        .post("/api/user/register")
        .send(userPayload)
        .expect(400);
    });
    it("can not Create unvalidated account", async () => {
      const userPayload = {
        fullNames: "Sabato Jest",
      };
      await supertest(app)
        .post("/api/user/register")
        .send(userPayload)
        .expect(400);
    });
  });
  
  it("only admin get user data", async () => {
    await supertest(app).get("/api/user").expect(401);
  });

  it("only validated login", async () => {
    let user = {
      email: "invalid",
    };
    await supertest(app).post("/api/user/login").send(user).expect(400);
  });
});
