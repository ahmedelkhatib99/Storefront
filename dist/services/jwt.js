"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const tokenSecret = process.env.TOKEN_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, tokenSecret);
        next();
    }
    catch (error) {
        res.status(401).json({ status: 0, message: "Unauthorized. valid token must be provided" });
    }
};
exports.default = verifyAuthToken;
