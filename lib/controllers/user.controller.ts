import * as express from "express";
import { appUser, userInterface } from "../models";
import * as jwt from "jsonwebtoken";
import { loginValidate, registerValidate } from "../utils/validations";
import * as bcrypt from "bcrypt";

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
      res.status(400).send({
        error: `Please provide valid ${valid.error.details[0].path}`,
      });
    }
  } catch (error) {
    res
      .status(503)
      .send({ error: `User Registration failed please try again later` });
  }
};

export const userLogin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const valid = loginValidate(req.body);
  if (!valid.error) {
    try {
      const user = await appUser.findOne({ email: req.body.email });
      if (!user) {
        res.status(401).send({ error: "incorrect username or password" });
      }
      const matchPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!matchPassword) {
        res.status(401).send({ error: "Incorrect username or password" });
      }

      const payload = {
        email: user.email,
        id: user._id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });

      return res.status(200).send({
        message: "logged in",
        success: true,
        token: "Bearer " + token,
      });
    } catch (error) {
      res.status(503).send({ error: `Login failed please try again later` });
    }
  } else {
    res.status(400).send({
      error: `Please provide valid ${valid.error.details[0].path}`,
    });
  }
};
