import * as express from "express";
import { appUser, userInterface } from "../models";
import * as jwt from "jsonwebtoken";
import { registerValidate } from "../utils/validations";

// const createToken = (user: userInterface) => {
//   return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
//     expiresIn: 86400,
//   });
// };

export const userRegister = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const valid = registerValidate(req.body);
    if (!valid.error) {
      if (!req.body.email || !req.body.password || !req.body.fullNames) {
        return res
          .status(400)
          .send({ error: "Please provide email or password or name" });
      }
      const user = await appUser.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send({ error: "User already exist" });
      } else {
        const newUser = new appUser(req.body);
        await newUser.save();
        return res.status(201).send({ "New User created": newUser });
      }
    } else {
      res.status(400).send({ error: "User could not be validated" });
    }
  } catch (error) {
    res.status(400).send({ error: `User can not be registered ${error}` });
  }
};
