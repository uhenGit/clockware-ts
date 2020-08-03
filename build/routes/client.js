"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var typeorm_1 = require("typeorm");
var Client_1 = require("../models/Client");
var bcrypt = require("bcryptjs");
//import * as bcrypt from "bcryptjs";
var jwt = __importStar(require("jsonwebtoken"));
var auth_1 = require("../middleWare/auth");
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
        .then(function (data) {
        if (data) {
            return res
                .status(400)
                .json({ msg: data.mail + " allready exists", isSignin: false });
        }
        else {
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
                            return res.status(200).json({
                                user: {
                                    name: data.name,
                                    mail: data.mail,
                                    id: data.id,
                                },
                                msg: "Client " + data.name + " created. Now You can login",
                                isSignin: true,
                            });
                        })
                            .catch(function (err) { return console.log("add query error: ", err); });
                    }
                });
            });
        }
    })
        .catch(function (err) {
        console.log("client find error: ", err);
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
                            isAuth: true,
                            isAdmin: true,
                        });
                    }
                    else {
                        res.json({
                            user: {
                                mail: client === null || client === void 0 ? void 0 : client.mail,
                                name: client === null || client === void 0 ? void 0 : client.name,
                                city: client === null || client === void 0 ? void 0 : client.city,
                                id: client === null || client === void 0 ? void 0 : client.id,
                            },
                            token: accessToken,
                            isAdmin: false,
                            isAuth: true,
                        });
                    }
                }
                else {
                    res.json({
                        msg: "Wrong password. Authorization failed",
                        isAuth: false,
                    });
                }
            })
                .catch(function (err) {
                return res.json({
                    msg: "Invalid credentials. Authorization failed",
                    isAuth: false,
                    error: err,
                });
            });
        })
            .catch(function (err) {
            return res.status(404).json({ msg: "Client not found", error: err });
        });
    }
});
// GET_ONE_CLIENT
router.get("/:id", function (req, res) {
    var clientRepository = typeorm_1.getRepository(Client_1.Client);
    clientRepository
        .findOne(req.params.id)
        .then(function (client) { return res.status(200).json(client); })
        .catch(function (err) { return console.log("find one error: ", err); });
});
// UPDATE_CLIENT
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
        return res.status(200).json({
            msg: "Updated strings quantity: " + data.affected,
            result: data,
        });
    })
        .catch(function (err) { return res.status(400).json({ msg: err.detail }); });
});
// DELETE_CLIENT
// todo: set auth (admin)
router.delete("/delete/:id", auth_1.auth, function (req, res) {
    var clientRepository = typeorm_1.getRepository(Client_1.Client);
    //console.log(req.headers);
    clientRepository
        .delete(req.params.id)
        .then(function (result) {
        return res
            .status(200)
            .json({ msg: "Deleted strings quantity: " + result.affected, result: result });
    })
        .catch(function (err) { return console.log("delete error: ", err); });
});
module.exports = router;
