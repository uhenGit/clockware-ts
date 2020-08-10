import express from "express";
import { getRepository } from "typeorm";
import { Client } from "../models/Client";

const bcrypt = require("bcryptjs");
//import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { auth } from "../middleWare/auth";

const router = express.Router();

router.get("/all", auth, (req: express.Request, res: express.Response) => {
  const clientRepository = getRepository(Client);
  clientRepository
    .find()
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log("all query error: ", err));
});

// POST_NEW_CLIENT
router.post("/register", (req: express.Request, res: express.Response) => {
  const clientRepository = getRepository(Client);
  const newClient = new Client(),
    date = new Date(),
    insertDate = date.toISOString();
  let { name, mail, password, city } = req.body;
  if (!name || !mail || !password) {
    return res.status(400).json({
      msg: "all fields are required",
      isSignin: false,
    });
  }
  if (name.length < 4) {
    return res.status(400).json({
      msg: "login name must unclude more than 3 symbols",
      isSignin: false,
    });
  }
  clientRepository
    .findOne({ mail: req.body.mail })
    .then((data) => {
      if (data) {
        return res
          .status(400)
          .json({ msg: `${data.mail} allready exists`, isSignin: false });
      } else {
        newClient.name = name;
        newClient.city = city;
        newClient.mail = mail;
        newClient.createdAt = insertDate;
        newClient.updatedAt = insertDate;
        bcrypt.genSalt(10, (err: Error, salt: string) => {
          if (err) {
            return console.log("gensalt error: ", err);
          }
          bcrypt.hash(password, salt, (hashErr: Error, hash: string) => {
            if (hashErr) {
              throw hashErr;
            } else {
              newClient.password = hash;
              clientRepository
                .save(newClient)
                .then((data) =>
                  res.status(200).json({
                    user: {
                      name: data.name,
                      mail: data.mail,
                      id: data.id,
                    },
                    msg: `Client ${data.name} created. Now You can login`,
                    isSignin: true,
                  })
                )
                .catch((err) => console.log("add query error: ", err));
            }
          });
        });
      }
    })
    .catch((err) => {
      console.log("client find error: ", err);
    });
});

// LOGIN
router.post("/login", (req: express.Request, res: express.Response) => {
  if (!req.body.mail || !req.body.password) {
    return res.json({ alert: "all fields required" });
  } else {
    const clientRepository = getRepository(Client);
    clientRepository
      .findOne({ mail: req.body.mail })
      .then((client) => {
        bcrypt
          .compare(req.body.password, client?.password)
          .then((result: Boolean) => {
            if (result) {
              const matchedClient = { mail: client?.mail };
              const accessToken = jwt.sign(matchedClient, "secret");
              if (client?.name === "admin") {
                res.json({
                  user: {
                    mail: client.mail,
                    name: client.name,
                    city: client?.city,
                    id: client?.id,
                  },
                  token: accessToken,
                  isAuth: true,
                  isAdmin: true,
                });
              } else {
                res.json({
                  user: {
                    mail: client?.mail,
                    name: client?.name,
                    city: client?.city,
                    id: client?.id,
                  },
                  token: accessToken,
                  isAdmin: false,
                  isAuth: true,
                });
              }
            } else {
              res.json({
                msg: "Wrong password. Authorization failed",
                isAuth: false,
              });
            }
          })
          .catch((err: string) =>
            res.json({
              msg: "Invalid credentials. Authorization failed",
              isAuth: false,
              error: err,
            })
          );
      })
      .catch((err: Error) =>
        res.status(404).json({ msg: "Client not found", error: err })
      );
  }
});

// GET_ONE_CLIENT
router.get("/:id", auth, (req: express.Request, res: express.Response) => {
  const clientRepository = getRepository(Client);
  clientRepository
    .findOne(req.params.id)
    .then((client) => res.status(200).json(client))
    .catch((err) => console.log("find one error: ", err));
});

// UPDATE_CLIENT
// todo: set auth (user)
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

module.exports = router;
