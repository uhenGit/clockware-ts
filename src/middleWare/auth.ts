import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.header("x-auth-token");
  if (!token) {
    res.status(401).json({ msg: "No token. Action denied" });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    // todo: will use to set refresh token
    res.locals.authMail = decoded;
    //req.body.mail = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token not valid" });
  }
};
