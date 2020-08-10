"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var typeorm_1 = require("typeorm");
var Order_1 = require("../models/Order");
var Master_1 = require("../models/Master");
var auth_1 = require("../middleWare/auth");
var router = express_1.default.Router();
// !!!!!!!!!!!!! GET ORDERS BY DATE
router.get("/all", auth_1.auth, function (req, res) {
    var orderRepository = typeorm_1.getRepository(Order_1.Order);
    orderRepository
        .find()
        .then(function (data) { return res.status(200).json(data); })
        .catch(function (err) { return console.log("all query error: ", err); });
});
// fix join
router.post("/add", auth_1.auth, function (req, res) {
    var orderRepository = typeorm_1.getRepository(Order_1.Order);
    var newOrder = new Order_1.Order(), newMaster = new Master_1.Master(), orderDate = new Date(), insertDate = orderDate.toISOString();
    newMaster.id = req.body.masterId;
    newOrder.clientName = req.body.clientName;
    newOrder.cityName = req.body.cityName;
    newOrder.masterId = newMaster.id;
    //newOrder.master_name = newMaster.name;
    newOrder.clockSize = req.body.clockSize;
    newOrder.isDone = false;
    newOrder.date = req.body.date;
    newOrder.time = req.body.time;
    var splitTime = req.body.time.split(".");
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
        .then(function (data) {
        return res
            .status(200)
            .json({ msg: "Order on " + data.time + " " + data.date + " created" });
    })
        .catch(function (err) {
        return res.status(400).json({ msg: err.detail + " Error in " + err.column });
    });
});
// set update route!!!!!!!!
router.put("/update/:id", auth_1.auth, function (req, res) {
    var orderRepository = typeorm_1.getRepository(Order_1.Order);
    var updatedOrder = new Order_1.Order(), date = new Date(), insertDate = date.toISOString();
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
        .then(function (data) {
        return res
            .status(200)
            .json({ msg: "Updated strings quantity: " + data.affected });
    })
        .catch(function (err) { return res.status(400).json({ msg: err.detail }); });
});
router.delete("/delete/:id", auth_1.auth, function (req, res) {
    var orderRepository = typeorm_1.getRepository(Order_1.Order);
    orderRepository
        .delete(req.params.id)
        .then(function (result) {
        return res
            .status(200)
            .json({ msg: "Deleted strings quantity: " + result.affected });
    })
        .catch(function (err) { return console.log("delete error: ", err); });
});
module.exports = router;
