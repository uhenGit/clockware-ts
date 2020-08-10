import express from "express";
import { getRepository } from "typeorm";
import { City } from "../models/City";
import { auth } from "../middleWare/auth";

const router = express.Router();

router.get("/all", (req: express.Request, res: express.Response) => {
  const cityRepository = getRepository(City);
  cityRepository.findOne({ name: "Dnipro" })
    .then(data => {
      if (data === undefined) {
        const newCity = new City(),
          date = new Date(),
          insertDate = date.toISOString();
        newCity.name = "Dnipro";
        newCity.createdAt = insertDate;
        newCity.updatedAt = insertDate;
        cityRepository
          .save(newCity)
          .then(() => {
            cityRepository
              .find()
              .then((data) => res.status(200).json(data))
              .catch((err) => console.log("all query error: ", err));
          })
      }
      else {
        cityRepository
          .find()
          .then((data) => res.status(200).json(data))
          .catch((err) => console.log("all query error: ", err));
      }
    }).catch(err => console.log("find one error: ", err))
});

router.get("/:id", (req: express.Request, res: express.Response) => {
  const cityRepository = getRepository(City);
  cityRepository
    .findOne(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(400).json({
        msg: `invalid params: ${
          err.parameters
          }. must be a number, but got a ${typeof err.parameters}`,
      })
    );
});

router.post("/add", auth, (req: express.Request, res: express.Response) => {
  const cityRepository = getRepository(City);
  const newCity = new City(),
    date = new Date(),
    insertDate = date.toISOString();
  newCity.name = req.body.name;
  newCity.createdAt = insertDate;
  newCity.updatedAt = insertDate;
  cityRepository
    .save(newCity)
    .then((data) =>
      res.status(200).json({ data, msg: `City ${data.name} created` })
    )
    .catch((err) => console.log("all query error: ", err));
});

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

router.delete(
  "/delete/:id",
  auth,
  (req: express.Request, res: express.Response) => {
    const cityRepository = getRepository(City);
    cityRepository
      .delete(req.params.id)
      .then((result) =>
        res
          .status(200)
          .json({ result, msg: `Deleted strings quantity: ${result.affected}` })
      )
      .catch((err) => console.log("delete error: ", err));
  }
);
module.exports = router;
