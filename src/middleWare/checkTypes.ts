import { Request, Response, NextFunction } from "express";

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    console.log(req.body);
    res.status(401).json({ msg: "No id" });
  } else {
    try {
      req.body.mail !== "";
      next();
    } catch (error) {
      throw error;
    }
  }
};
