import { Request, Response, NextFunction } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    const userRole = user?.role;

    if (userRole === "admin") {
      next();
    } else {
      res.status(403).send({ error: "Not authorized" });
    }
  }
};

export default isAdmin;
