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

describe("Message API", () => {
  describe("Post Message Api", () => {
    it("Send message successfull", async () => {
      const messagePayload = {
        senderName: "Hakizimana Jest",
        senderEmail: "mesabato123@gmail.com",
        message: "Jest message sabato is sending",
      };
      await supertest(app)
        .post("/api/message")
        .send(messagePayload)
        .expect(200);
    });
  });

  describe("Get message", () => {
    it("unauthorized can not get message", async () => {
      await supertest(app).get("/api/message").expect(401);
    });
  });
});
