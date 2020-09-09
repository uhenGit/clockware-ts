import express from "express";
import * as dotenv from "dotenv";
import { getRepository } from "typeorm";
import { Client } from "../models/Client";
dotenv.config();
const bcrypt = require("bcryptjs");
//import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { auth } from "../middleWare/auth";
import { yupRegister, yupLogin } from "../middleWare/yupSchema";

const router = express.Router();

router.get("/all", auth, (req: express.Request, res: express.Response) => {
  const clientRepository = getRepository(Client);
  clientRepository
    .find()
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log("all query error: ", err));
});

// POST_NEW_CLIENT
router.post(
  "/register",
  yupRegister,
  async (req: express.Request, res: express.Response) => {
    const clientRepository = getRepository(Client);
    const newClient = new Client();
    const date = new Date();
    const insertDate = date.toISOString();
    let { name, mail, password, city } = req.body;
    const data = await clientRepository.findOne({ mail: req.body.mail });
    if (data) {
      res
        .status(400)
        .json({ msg: `${data.mail} allready exists`, isSignin: false });
    } else {
      try {
        bcrypt.hash(password, 10, (err: Error, hash: string) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            newClient.name = name;
            newClient.city = city;
            newClient.mail = mail;
            newClient.createdAt = insertDate;
            newClient.updatedAt = insertDate;
            newClient.password = hash;
            clientRepository.save(newClient).then((data) => {
              res.status(200).json({
                user: {
                  name: data.name,
                  mail: data.mail,
                  id: data.id,
                },
                msg: `Client ${data.name} created. Now You can login`,
                isSignin: true,
              });
            });
          }
        });
      } catch (error) {
        console.log("client find error: ", error);
      }
    }
  }
);

// LOGIN
router.post(
  "/login",
  yupLogin,
  async (req: express.Request, res: express.Response) => {
    const clientRepository = getRepository(Client);
    const client = await clientRepository.findOne({ mail: req.body.mail });
    if (client) {
      try {
        const result = await bcrypt.compare(req.body.password, client.password);
        if (result) {
          const secret: any = process.env.JWT_SECRET;
          const matchedClient = { mail: client.mail };
          const accessToken = jwt.sign(matchedClient, secret);
          const user = {
            mail: client.mail,
            name: client.name,
            city: client.city,
            id: client.id,
          };
          if (client.name === "admin") {
            res.json({
              user,
              token: accessToken,
              isAuth: true,
              isAdmin: true,
            });
          } else {
            res.json({
              user,
              token: accessToken,
              isAdmin: false,
              isAuth: true,
            });
          }
        } else {
          return res
            .status(400)
            .json({
              msg: "Wrong password. Authorization failed",
              isAuth: false,
            });
        }
      } catch (error) {
        return res
          .status(400)
          .json({
            msg: "Wrong credentials. Authorization failed",
            isAuth: false,
          });
      }
    } else {
      return res.status(404).json({ msg: "Client not found", isAuth: false });
    }
  }
);

// GET_ONE_CLIENT
router.get("/:id", auth, (req: express.Request, res: express.Response) => {
  const clientRepository = getRepository(Client);
  clientRepository
    .findOne(req.params.id)
    .then((client) => res.status(200).json(client))
    .catch((err) => console.log("find one error: ", err));
});

// UPDATE_CLIENT
router.put(
  "/update/:id",
  auth,
  (req: express.Request, res: express.Response) => {
    const clientRepository = getRepository(Client);
    const updatedClient = new Client(),
      date = new Date(),
      insertDate = date.toISOString();
    updatedClient.updatedAt = insertDate;
    if (req.body.name) {
      updatedClient.name = req.body.name;
    }
    if (req.body.mail) {
      updatedClient.mail = req.body.mail;
    }
    if (req.body.password) {
      updatedClient.password = req.body.password;
    }
    if (req.body.city) {
      updatedClient.city = req.body.city;
    }
    clientRepository
      .update(req.params.id, updatedClient)
      .then((data) =>
        res.status(200).json({
          msg: `Updated strings quantity: ${data.affected}`,
          result: data,
        })
      )
      .catch((err) => res.status(400).json({ msg: err.detail }));
  }
);

// DELETE_CLIENT
// todo: set auth (admin)
router.delete(
  "/delete/:id",
  auth,
  (req: express.Request, res: express.Response) => {
    const clientRepository = getRepository(Client);
    //console.log(req.headers);

    clientRepository
      .delete(req.params.id)
      .then((result) =>
        res
          .status(200)
          .json({ msg: `Deleted strings quantity: ${result.affected}`, result })
      )
      .catch((err) => console.log("delete error: ", err));
  }
);

export default router;
