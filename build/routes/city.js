"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var typeorm_1 = require("typeorm");
var City_1 = require("../models/City");
var auth_1 = require("../middleWare/auth");
var router = express_1.default.Router();
router.get("/all", function (req, res) {
    var cityRepository = typeorm_1.getRepository(City_1.City);
    cityRepository.findOne({ name: "Dnipro" })
        .then(function (data) {
        if (data === undefined) {
            var newCity = new City_1.City(), date = new Date(), insertDate = date.toISOString();
            newCity.name = "Dnipro";
            newCity.createdAt = insertDate;
            newCity.updatedAt = insertDate;
            cityRepository
                .save(newCity)
                .then(function () {
                cityRepository
                    .find()
                    .then(function (data) { return res.status(200).json(data); })
                    .catch(function (err) { return console.log("all query error: ", err); });
            });
        }
        else {
            cityRepository
                .find()
                .then(function (data) { return res.status(200).json(data); })
                .catch(function (err) { return console.log("all query error: ", err); });
        }
    }).catch(function (err) { return console.log("find one error: ", err); });
});
router.get("/:id", function (req, res) {
    var cityRepository = typeorm_1.getRepository(City_1.City);
    cityRepository
        .findOne(req.params.id)
        .then(function (data) { return res.status(200).json(data); })
        .catch(function (err) {
        return res.status(400).json({
            msg: "invalid params: " + err.parameters + ". must be a number, but got a " + typeof err.parameters,
        });
    });
});
router.post("/add", auth_1.auth, function (req, res) {
    var cityRepository = typeorm_1.getRepository(City_1.City);
    var newCity = new City_1.City(), date = new Date(), insertDate = date.toISOString();
    newCity.name = req.body.name;
    newCity.createdAt = insertDate;
    newCity.updatedAt = insertDate;
    cityRepository
        .save(newCity)
        .then(function (data) {
        return res.status(200).json({ data: data, msg: "City " + data.name + " created" });
    })
        .catch(function (err) { return console.log("all query error: ", err); });
});
router.put("/update/:id", function (req, res) {
    var cityRepository = typeorm_1.getRepository(City_1.City);
    var updatedCity = new City_1.City(), date = new Date(), insertDate = date.toISOString();
    if (req.body.name) {
        updatedCity.name = req.body.name;
    }
    updatedCity.updatedAt = insertDate;
    cityRepository
        .update(req.params.id, updatedCity)
        .then(function (data) {
        return res
            .status(200)
            .json({ msg: "Updated strings quantity: " + data.affected });
    })
        .catch(function (err) { return console.log("all query error: ", err); });
});
router.delete("/delete/:id", auth_1.auth, function (req, res) {
    var cityRepository = typeorm_1.getRepository(City_1.City);
    cityRepository
        .delete(req.params.id)
        .then(function (result) {
        return res
            .status(200)
            .json({ result: result, msg: "Deleted strings quantity: " + result.affected });
    })
        .catch(function (err) { return console.log("delete error: ", err); });
});
module.exports = router;
