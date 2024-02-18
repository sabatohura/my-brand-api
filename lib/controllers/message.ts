import { Request, Response } from "express";
import { appMessage } from "./../models";
import { contactMessageValidate } from "utils/validations";

export const listQueryMessages = async (res: Response, req: Request) => {
  const messages = await appMessage.find();
  if (messages) {
    res.status(200).send(messages);
  } else {
    res.status(200).send({ message: "you don't have any message" });
  }
};

export const sendMessage = async (res: Response, req: Request) => {
  try {
    const valid = contactMessageValidate(req.body);
    if (!valid.error) {
      const message = new appMessage(req.body);
      await message.save();
      res.status(200).send(message);
    } else {
      res.status(400).send({ error: "Message fields can not be validated" });
    }
  } catch (error) {
    res.status(400).send({ error: `could not send message due to ${error}` });
  }
};

export const deleteMessage = async (res: Response, req: Request) => {
  try {
    await appMessage.deleteOne({ _id: req.params.id });
    res.status(204).send({ message: "message deleted successfull" });
  } catch {
    res.status(404).send({ error: "message doesn't exist!" });
  }
};

export const updateMessageStatus = async (res: Response, req: Request) => {
  try {
    const message = await appMessage.findOne({ _id: req.params.id });
    message.status = "read";
  } catch {
    res.status(404).send({ error: "message status can't be changed" });
  }
};
