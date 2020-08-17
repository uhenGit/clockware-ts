import express from "express";
import { getRepository } from "typeorm";
import { Master } from "../models/Master";
import { auth } from "../middleWare/auth";

const router = express.Router();

router.get("/all", auth, (req: express.Request, res: express.Response) => {
  const masterRepository = getRepository(Master);
  masterRepository
    .find()
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log("all query error: ", err));
});

router.get(
  "/ordered/:date/:time",
  (req: express.Request, res: express.Response) => {
    const masterRepository = getRepository(Master);
    masterRepository
      .query(`SELECT name FROM master`)
      .then((data) => {
        //res.json(data);
        console.log(
          `data (names): ${data.name}, params: ${req.params.date}, ${req.params.time}`
        );
      })
      .catch((err) => console.log("params query error: ", err));
  }
);

router.post("/add", auth, (req: express.Request, res: express.Response) => {
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
      res.status(200).json({ msg: `Master ${data.name} created`, data })
    )
    .catch((err) => console.log("add query error: ", err));
});

// set update route!!!!!!!!
router.put(
  "/update/:id",
  auth,
  (req: express.Request, res: express.Response) => {
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
  }
);

router.delete(
  "/delete/:id",
  auth,
  (req: express.Request, res: express.Response) => {
    const masterRepository = getRepository(Master);
    masterRepository
      .delete(req.params.id)
      .then((result) =>
        res
          .status(200)
          .json({ msg: `Deleted strings quantity: ${result.affected}` })
      )
      .catch((err) => console.log("delete error: ", err));
  }
);

export default router;
