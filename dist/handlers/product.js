"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const jwt_1 = __importDefault(require("../services/jwt"));
const productStore = new product_1.ProductStore();
const index = async (_req, res) => {
    const products = await productStore.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await productStore.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    try {
        const product = {
            id: req.body.id,
            product_name: req.body.product_name,
            price: req.body.price,
            category: req.body.category
        };
        const newProduct = await productStore.create(product);
        res.json(newProduct);
    }
    catch (error) {
        let message = 'Unknown Error';
        if (error instanceof Error)
            message = error.message;
        res.status(400).json({ status: 0, message });
    }
};
const categoryProducts = async (req, res) => {
    const products = await productStore.categoryProducts(req.body.category);
    res.json(products);
};
const deleteProduct = async (req, res) => {
    const product = await productStore.delete(req.params.id);
    res.json(product);
};
const productsRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', jwt_1.default, create);
    app.post('/products/category', categoryProducts);
    app.delete('/products/:id', deleteProduct);
};
exports.default = productsRoutes;
