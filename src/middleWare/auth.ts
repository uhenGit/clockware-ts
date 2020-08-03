import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.header("x-auth-token");
  if (!token) {
    res.status(401).json({ msg: "No token. Action denied" });
  }
  try {
    const decoded = jwt.verify(token, "secret");
    // todo: will use to set refresh token
    req.body.mail = decoded;
    next();
  } catch (err) {
    console.log("verification error: ", err);
    res.status(400).json({ msg: "Token not valid" });
  }
};
