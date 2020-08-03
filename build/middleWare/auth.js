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
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jwt = __importStar(require("jsonwebtoken"));
exports.auth = function (req, res, next) {
    var token = req.header("x-auth-token");
    if (!token) {
        res.status(401).json({ msg: "No token. Action denied" });
    }
    try {
        var decoded = jwt.verify(token, "secret");
        // todo: will use to set refresh token
        req.body.mail = decoded;
        next();
    }
    catch (err) {
        console.log("verification error: ", err);
        res.status(400).json({ msg: "Token not valid" });
    }
};
