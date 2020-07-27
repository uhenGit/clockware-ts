"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var typeorm_1 = require("typeorm");
var Master_1 = require("../models/Master");
var router = express_1.default.Router();
// todo: set auth (user)
router.get("/all", function (req, res) {
    var masterRepository = typeorm_1.getRepository(Master_1.Master);
    masterRepository
        .find()
        .then(function (data) { return res.status(200).json(data); })
        .catch(function (err) { return console.log("all query error: ", err); });
});
// todo: set auth (admin)
router.post("/add", function (req, res) {
    var masterRepository = typeorm_1.getRepository(Master_1.Master);
    var newMaster = new Master_1.Master(), date = new Date(), insertDate = date.toISOString();
    newMaster.name = req.body.name;
    newMaster.city = req.body.city;
    newMaster.createdAt = insertDate;
    newMaster.updatedAt = insertDate;
    masterRepository
        .save(newMaster)
        //.query(`INSERT INTO cities (name) VALUES (${name}) returning *`)
        .then(function (data) {
        return res.status(200).json({ msg: "Master " + data.name + " created" });
    })
        .catch(function (err) { return console.log("add query error: ", err); });
});
// set update route!!!!!!!!
// todo: set auth (user)
router.put("/update/:id", function (req, res) {
    var masterRepository = typeorm_1.getRepository(Master_1.Master);
    var updatedMaster = new Master_1.Master(), date = new Date(), insertDate = date.toISOString();
    updatedMaster.updatedAt = insertDate;
    // does not work
    //updatedMaster.rateArr.push(req.body.rateArr);
    masterRepository
        .update(req.params.id, updatedMaster)
        .then(function (data) {
        return res
            .status(200)
            .json({ msg: "Updated strings quantity: " + data.affected });
    })
        .catch(function (err) { return res.status(400).json({ msg: err.detail }); });
});
// todo: set auth (admin)
router.delete("/delete/:id", function (req, res) {
    var masterRepository = typeorm_1.getRepository(Master_1.Master);
    masterRepository
        .delete(req.params.id)
        .then(function (result) {
        return res
            .status(200)
            .json({ msg: "Deleted strings quantity: " + result.affected });
    })
        .catch(function (err) { return console.log("delete error: ", err); });
});
module.exports = router;
