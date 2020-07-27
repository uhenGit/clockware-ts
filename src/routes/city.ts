import express from "express";
import { getRepository } from "typeorm";
import { City } from "../models/City";

const router = express.Router();

// todo: set auth (user)
router.get("/all", (req: express.Request, res: express.Response) => {
  const cityRepository = getRepository(City);
  cityRepository
    .find()
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log("all query error: ", err));
  /*cityRepository
    .query("SELECT * FROM cities")
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log("all query error: ", err));*/
});

// todo: set auth (user)
router.get("/:id", (req: express.Request, res: express.Response) => {
  const cityRepository = getRepository(City);
  cityRepository
    .findOne(req.params.id)
    //.query(`SELECT * FROM cities WHERE id=${req.params.id}`)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(400).json({
        msg: `invalid params: ${
          err.parameters
        }. must be a number, but got a ${typeof err.parameters}`,
      })
    );
});

// todo: set auth (admin)
router.post("/add", (req: express.Request, res: express.Response) => {
  const cityRepository = getRepository(City);
  const newCity = new City(),
    date = new Date(),
    insertDate = date.toISOString();
  newCity.name = req.body.name;
  newCity.createdAt = insertDate;
  newCity.updatedAt = insertDate;
  cityRepository
    .save(newCity)
    //.query(`INSERT INTO cities (name) VALUES (${name}) returning *`)
    .then((data) => res.status(200).json({ msg: `City ${data.name} created` }))
    .catch((err) => console.log("all query error: ", err));
});

// todo: set auth (admin)
router.put("/update/:id", (req: express.Request, res: express.Response) => {
  const cityRepository = getRepository(City);
  const updatedCity = new City(),
    date = new Date(),
    insertDate = date.toISOString();
  if (req.body.name) {
    updatedCity.name = req.body.name;
  }
  updatedCity.updatedAt = insertDate;
  cityRepository
    .update(req.params.id, updatedCity)
    .then((data) =>
      res
        .status(200)
        .json({ msg: `Updated strings quantity: ${data.affected}` })
    )
    .catch((err) => console.log("all query error: ", err));
});

// todo: set auth (admin)
router.delete("/delete/:id", (req: express.Request, res: express.Response) => {
  const cityRepository = getRepository(City);
  cityRepository
    .delete(req.params.id)
    .then((result) =>
      res
        .status(200)
        .json({ msg: `Deleted strings quantity: ${result.affected}` })
    )
    .catch((err) => console.log("delete error: ", err));
});
module.exports = router;
