import passport from "./../config/passport";
import { Request, Response, NextFunction } from "express";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized. Please login to continue." });
    }

    req.user = user;
    console.log(user);
    return next();
  })(req, res, next);
};

export default authenticate;
