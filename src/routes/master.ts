import express from "express";
import { getRepository } from "typeorm";
import { Master } from "../models/Master";

const router = express.Router();

// todo: set auth (user)
router.get("/all", (req: express.Request, res: express.Response) => {
  const masterRepository = getRepository(Master);
  masterRepository
    .find()
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log("all query error: ", err));
});

// todo: set auth (admin)
router.post("/add", (req: express.Request, res: express.Response) => {
  const masterRepository = getRepository(Master);
  const newMaster = new Master(),
    date = new Date(),
    insertDate = date.toISOString();
  newMaster.name = req.body.name;
  newMaster.city = req.body.city;
  newMaster.createdAt = insertDate;
  newMaster.updatedAt = insertDate;
  masterRepository
    .save(newMaster)
    //.query(`INSERT INTO cities (name) VALUES (${name}) returning *`)
    .then((data) =>
      res.status(200).json({ msg: `Master ${data.name} created` })
    )
    .catch((err) => console.log("add query error: ", err));
});

// set update route!!!!!!!!
// todo: set auth (user)
router.put("/update/:id", (req: express.Request, res: express.Response) => {
  const masterRepository = getRepository(Master);
  const updatedMaster = new Master(),
    date = new Date(),
    insertDate = date.toISOString();
  updatedMaster.updatedAt = insertDate;
  // does not work
  //updatedMaster.rateArr.push(req.body.rateArr);
  masterRepository
    .update(req.params.id, updatedMaster)
    .then((data) =>
      res
        .status(200)
        .json({ msg: `Updated strings quantity: ${data.affected}` })
    )
    .catch((err) => res.status(400).json({ msg: err.detail }));
});

// todo: set auth (admin)
router.delete("/delete/:id", (req: express.Request, res: express.Response) => {
  const masterRepository = getRepository(Master);
  masterRepository
    .delete(req.params.id)
    .then((result) =>
      res
        .status(200)
        .json({ msg: `Deleted strings quantity: ${result.affected}` })
    )
    .catch((err) => console.log("delete error: ", err));
});

module.exports = router;
