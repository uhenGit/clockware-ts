"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var typeorm_1 = require("typeorm");
var Client_1 = require("../models/Client");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var router = express_1.default.Router();
// todo: set auth (admin)
router.get("/all", function (req, res) {
    var clientRepository = typeorm_1.getRepository(Client_1.Client);
    clientRepository
        .find()
        .then(function (data) { return res.status(200).json(data); })
        .catch(function (err) { return console.log("all query error: ", err); });
});
// register
// todo: bcrypt and jwt
router.post("/register", function (req, res) {
    var clientRepository = typeorm_1.getRepository(Client_1.Client);
    var newClient = new Client_1.Client(), date = new Date(), insertDate = date.toISOString();
    var _a = req.body, name = _a.name, mail = _a.mail, password = _a.password, city = _a.city;
    if (!name || !mail || !password) {
        return res.status(400).json({
            alert: "all fields are required",
        });
    }
    if (name.length < 4) {
        return res.status(400).json({
            alert: "login name must unclude more than 3 symbols",
        });
    }
    newClient.name = name;
    newClient.city = city;
    newClient.mail = mail;
    newClient.createdAt = insertDate;
    newClient.updatedAt = insertDate;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return console.log("gensalt error: ", err);
        }
        bcrypt.hash(password, salt, function (hashErr, hash) {
            if (hashErr) {
                throw hashErr;
            }
            else {
                newClient.password = hash;
                clientRepository
                    .save(newClient)
                    .then(function (data) {
                    return res.status(200).json({ msg: "Client " + data.name + " created" });
                })
                    .catch(function (err) { return console.log("add query error: ", err); });
            }
        });
    });
});
// set login route
router.post("/login", function (req, res) {
    if (!req.body.mail || !req.body.password) {
        return res.json({ alert: "all fields required" });
    }
    else {
        var clientRepository = typeorm_1.getRepository(Client_1.Client);
        clientRepository
            .findOne({ mail: req.body.mail })
            .then(function (client) {
            bcrypt
                .compare(req.body.password, client === null || client === void 0 ? void 0 : client.password)
                .then(function (result) {
                if (result) {
                    var matchedClient = { mail: client === null || client === void 0 ? void 0 : client.mail };
                    var accessToken = jwt.sign(matchedClient, "secret");
                    if ((client === null || client === void 0 ? void 0 : client.name) === "admin") {
                        res.json({
                            user: {
                                mail: client.mail,
                                name: client.name,
                            },
                            token: accessToken,
                            isAdmin: true,
                        });
                    }
                    else {
                        res.json({
                            user: {
                                mail: client === null || client === void 0 ? void 0 : client.mail,
                                name: client === null || client === void 0 ? void 0 : client.name,
                                city: client === null || client === void 0 ? void 0 : client.city,
                            },
                            token: accessToken,
                            isAdmin: false,
                        });
                    }
                }
                else {
                    res
                        .status(400)
                        .json({ msg: "Wrong password. Authorization failed" });
                }
            })
                .catch(function (err) {
                return res.json({ msg: "invalid credentials", error: err });
            });
        })
            .catch(function (err) {
            return res.status(404).json({ msg: "Client not found", error: err });
        });
    }
});
// set update route!!!!!!!!
// todo: set auth (user)
router.put("/update/:id", function (req, res) {
    var clientRepository = typeorm_1.getRepository(Client_1.Client);
    var updatedClient = new Client_1.Client(), date = new Date(), insertDate = date.toISOString();
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
        .then(function (data) {
        return res
            .status(200)
            .json({ msg: "Updated strings quantity: " + data.affected });
    })
        .catch(function (err) { return res.status(400).json({ msg: err.detail }); });
});
// todo: set auth (admin)
router.delete("/delete/:id", function (req, res) {
    var clientRepository = typeorm_1.getRepository(Client_1.Client);
    clientRepository
        .delete(req.params.id)
        .then(function (result) {
        return res
            .status(200)
            .json({ msg: "Deleted strings quantity: " + result.affected });
    })
        .catch(function (err) { return console.log("delete error: ", err); });
});
module.exports = router;
