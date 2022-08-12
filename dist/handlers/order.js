"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const jwt_1 = __importDefault(require("../services/jwt"));
const orderStore = new order_1.OrderStore();
const index = async (_req, res) => {
    try {
        const orders = await orderStore.index();
        res.json(orders);
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
        const order = await orderStore.show(req.params.id);
        res.json(order);
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
        const order = {
            id: req.body.id,
            status: req.body.status,
            user_id: req.body.user_id
        };
        const newOrder = await orderStore.create(order);
        res.json(newOrder);
    }
    catch (error) {
        let message = 'Unknown Error';
        if (error instanceof Error)
            message = error.message;
        res.status(400).json({ status: 0, message });
    }
};
const userOrders = async (req, res) => {
    try {
        const orders = await orderStore.userOrders(req.params.user_id);
        res.json(orders);
    }
    catch (error) {
        let message = 'Unknown Error';
        if (error instanceof Error)
            message = error.message;
        res.status(400).json({ status: 0, message });
    }
};
const deleteOrder = async (req, res) => {
    try {
        const order = await orderStore.delete(req.params.id);
        res.json(order);
    }
    catch (error) {
        let message = 'Unknown Error';
        if (error instanceof Error)
            message = error.message;
        res.status(400).json({ status: 0, message });
    }
};
const ordersRoutes = (app) => {
    app.get('/orders', jwt_1.default, index);
    app.get('/orders/:id', jwt_1.default, show);
    app.post('/orders', jwt_1.default, create);
    app.get('/orders/users/:user_id', jwt_1.default, userOrders);
    app.delete('/orders/:id', jwt_1.default, deleteOrder);
};
exports.default = ordersRoutes;
