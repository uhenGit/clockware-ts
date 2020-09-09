import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

export const yupRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let schema = yup.object().shape({
    name: yup.string().min(4).required("this field is required"),
    mail: yup.string().email().required("this field is required"),
    city: yup.string().required("this field is required"),
    password: yup.string().required("this field is required"),
  });
  try {
    schema.validateSync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    let errors: object[] = [];
    error.inner.forEach((err: { path: any; message: any }) => {
      errors.push({
        errorField: err.path,
        msg: err.message,
      });
    });
    return res.status(400).json({ reqMsg: errors, isSignin: false });
  }
};

export const yupLogin = (req: Request, res: Response, next: NextFunction) => {
  let schema = yup.object().shape({
    mail: yup.string().email().required("this field is required"),
    password: yup.string().required("this field is required"),
  });
  try {
    schema.validateSync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    let errors: object[] = [];
    error.inner.forEach((err: { path: any; message: any }) => {
      errors.push({
        errorField: err.path,
        msg: err.message,
      });
    });
    return res.status(400).json({ reqMsg: errors, isSignin: false });
  }
};
