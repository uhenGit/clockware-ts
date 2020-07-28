import express from "express";
import { getRepository } from "typeorm";
import { Client } from "../models/Client";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// todo: set auth (admin)
router.get("/all", (req: express.Request, res: express.Response) => {
  const clientRepository = getRepository(Client);
  clientRepository
    .find()
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log("all query error: ", err));
});

// register
// todo: bcrypt and jwt
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
                    msg: `Client ${data.name} created`,
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

// set login route
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
                  },
                  token: accessToken,
                  isAdmin: true,
                });
              } else {
                res.json({
                  user: {
                    mail: client?.mail,
                    name: client?.name,
                    city: client?.city,
                  },
                  token: accessToken,
                  isAdmin: false,
                });
              }
            } else {
              res
                .status(400)
                .json({ msg: "Wrong password. Authorization failed" });
            }
          })
          .catch((err: string) =>
            res.json({ msg: "invalid credentials", error: err })
          );
      })
      .catch((err: Error) =>
        res.status(404).json({ msg: "Client not found", error: err })
      );
  }
});
// set update route!!!!!!!!
// todo: set auth (user)
router.put("/update/:id", (req: express.Request, res: express.Response) => {
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
      res
        .status(200)
        .json({ msg: `Updated strings quantity: ${data.affected}` })
    )
    .catch((err) => res.status(400).json({ msg: err.detail }));
});

// todo: set auth (admin)
router.delete("/delete/:id", (req: express.Request, res: express.Response) => {
  const clientRepository = getRepository(Client);
  clientRepository
    .delete(req.params.id)
    .then((result) =>
      res
        .status(200)
        .json({ msg: `Deleted strings quantity: ${result.affected}` })
    )
    .catch((err) => console.log("delete error: ", err));
});

module.exports = router;
