import { Request, Response } from "express";
import { appMessage } from "../models";
import { contactMessageValidate } from "../utils/validations";

export const listQueryMessages = async (req: Request, res: Response) => {
  const messages = await appMessage.find();
  if (messages) {
    res.status(200).send(messages);
  } else {
    res.status(200).send({ message: "You haven't received any message yet" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const valid = contactMessageValidate(req.body);
    if (!valid.error) {
      const message = new appMessage(req.body);
      await message.save();
      res.status(200).send(message);
    } else {
      res.status(400).send({
        error: `Please provide valid ${valid.error.details[0].path}`,
      });
    }
  } catch (error) {
    res
      .status(503)
      .send({ error: `Sending message failed please try again later` });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    await appMessage.deleteOne({ _id: req.params.id });
  } catch {
    res.status(400).send({ error: `Message you are deleting doesn't exist` });
  }
};

export const updateMessageStatus = async (req: Request, res: Response) => {
  try {
    const message = await appMessage.findOne({ _id: req.params.id });
    message.status = "read";
    await message.save();
    res.status(200).send({ message: "Message is read" });
  } catch {
    res.status(400).send({ error: "message status can't be changed" });
  }
};
