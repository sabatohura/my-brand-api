import passport from "./../config/passport";
import { Request, Response, NextFunction } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res
        .status(401)
        .json({ error: "not authenticated. Please login to continue." });
    }

    if (user.role !== "Admin") {
      return res.status(401).json({ error: "Unauthorized. for this action." });
    }

    req.user = user;
    return next();
  })(req, res, next);
};

export default isAdmin;
