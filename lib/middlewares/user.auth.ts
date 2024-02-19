import * as express from "express";
const authenticate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({ error: "please login to continue" });
};

export default authenticate;
