import * as express from "express";
import { appUser, userInterface } from "./../models";
import * as jwt from "jsonwebtoken";

// const createToken = (user: userInterface) => {
//   return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
//     expiresIn: 86400,
//   });
// };

export const userRegister = async (
  req: express.Request,
  res: express.Response
) => {
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
    return res.status(201).send({ "User created": newUser });
  }
};
