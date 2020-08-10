import express from "express";
import { getRepository } from "typeorm";
import { Order } from "../models/Order";
import { Master } from "../models/Master";
import { auth } from "../middleWare/auth";

const router = express.Router();

// !!!!!!!!!!!!! GET ORDERS BY DATE
router.get("/all", auth, (req: express.Request, res: express.Response) => {
  const orderRepository = getRepository(Order);
  orderRepository
    .find()
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log("all query error: ", err));
});

// fix join
router.post("/add", auth, (req: express.Request, res: express.Response) => {
  const orderRepository = getRepository(Order);
  const newOrder = new Order(),
    newMaster = new Master(),
    orderDate = new Date(),
    insertDate = orderDate.toISOString();
  newMaster.id = req.body.masterId;
  newOrder.clientName = req.body.clientName;
  newOrder.cityName = req.body.cityName;
  newOrder.masterId = newMaster.id;
  //newOrder.master_name = newMaster.name;
  newOrder.clockSize = req.body.clockSize;
  newOrder.isDone = false;
  newOrder.date = req.body.date;
  newOrder.time = req.body.time;
  let splitTime = req.body.time.split(".");
  switch (req.body.clockSize) {
    case "sm":
      newOrder.willClose =
        (Number(splitTime[0]) + 1).toString() + "." + splitTime[1];
      break;
    case "med":
      newOrder.willClose =
        (Number(splitTime[0]) + 2).toString() + "." + splitTime[1];
      break;
    case "lg":
      newOrder.willClose =
        (Number(splitTime[0]) + 3).toString() + "." + splitTime[1];
      break;
    default:
      break;
  }
  newOrder.createdAt = insertDate;
  newOrder.updatedAt = insertDate;
  orderRepository
    .save(newOrder)
    .then((data) =>
      res
        .status(200)
        .json({ msg: `Order on ${data.time} ${data.date} created` })
    )
    .catch((err) =>
      res.status(400).json({ msg: `${err.detail} Error in ${err.column}` })
    );
});

// set update route!!!!!!!!
router.put(
  "/update/:id",
  auth,
  (req: express.Request, res: express.Response) => {
    const orderRepository = getRepository(Order);
    const updatedOrder = new Order(),
      date = new Date(),
      insertDate = date.toISOString();
    updatedOrder.updatedAt = insertDate;
    if (req.body.clientName) {
      updatedOrder.clientName = req.body.clientName;
    }
    if (req.body.cityName) {
      updatedOrder.cityName = req.body.cityName;
    }
    if (req.body.masterName) {
      updatedOrder.masterId = req.body.masterId;
    }
    if (req.body.clockSize) {
      updatedOrder.clockSize = req.body.clockSize;
    }
    if (req.body.date) {
      updatedOrder.date = req.body.date;
    }
    if (req.body.time) {
      updatedOrder.time = req.body.time;
    }
    orderRepository
      .update(req.params.id, updatedOrder)
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
    const orderRepository = getRepository(Order);
    orderRepository
      .delete(req.params.id)
      .then((result) =>
        res
          .status(200)
          .json({ msg: `Deleted strings quantity: ${result.affected}` })
      )
      .catch((err) => console.log("delete error: ", err));
  }
);

module.exports = router;
