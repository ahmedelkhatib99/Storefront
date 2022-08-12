"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwt_1 = __importDefault(require("../services/jwt"));
dotenv_1.default.config();
const userStore = new user_1.UserStore();
const index = async (_req, res) => {
    try {
        const users = await userStore.index();
        res.json(users);
    }
    catch (error) {
        let message = 'Unknown Error';
        if (error instanceof Error)
            message = error.message;
        res.status(400).json({ status: 0, message });
    }
};
const show = async (req, res) => {
    try {
        const user = await userStore.show(req.params.id);
        res.json(user);
    }
    catch (error) {
        let message = 'Unknown Error';
        if (error instanceof Error)
            message = error.message;
        res.status(400).json({ status: 0, message });
    }
};
const create = async (req, res) => {
    try {
        const user = {
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_password: req.body.user_password
        };
        const newUser = await userStore.create(user);
        const tokenSecret = process.env.TOKEN_SECRET;
        var token = jsonwebtoken_1.default.sign({ user: newUser }, tokenSecret);
        res.json(token);
    }
    catch (error) {
        let message = 'Unknown Error';
        if (error instanceof Error)
            message = error.message;
        res.status(400).json({ status: 0, message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const user = await userStore.delete(req.params.id);
        res.json(user);
    }
    catch (error) {
        let message = 'Unknown Error';
        if (error instanceof Error)
            message = error.message;
        res.status(400).json({ status: 0, message });
    }
};
const usersRoutes = (app) => {
    app.get('/users', jwt_1.default, index);
    app.get('/users/:id', jwt_1.default, show);
    app.post('/users', create);
    app.delete('/users/:id', jwt_1.default, deleteUser);
};
exports.default = usersRoutes;
