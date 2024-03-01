import * as supertest from "supertest";
import app from "../config/test";

const messageBody = {
  senderName: "Hakizimana tests",
  senderEmail: "mesabato123@tests.com",
  message: "Test four message sabato is sending form tests",
};

describe("user can send message", () => {
  describe("post message route", () => {
    it("should return 200 and create a message", async () => {
      await supertest(app).post(`/api/message`).send(messageBody).expect(200);
    });
  });
});
