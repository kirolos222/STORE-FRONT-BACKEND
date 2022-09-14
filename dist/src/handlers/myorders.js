"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../model/orders");
const verify_1 = __importDefault(require("../middleware/verify"));
const store = new orders_1.OrderStore();
const index = async (_req, res) => {
    try {
        const weapen = await store.index();
        return res.status(200).json(weapen);
    }
    catch (err) {
        res.status(400);
        res.json(`products cannot be creted because ${err}`);
    }
};
const showcurrent = async (req, res) => {
    // jwt.verify(req.body.token, process.env.TOKEN_SECRET as unknown as string)
    try {
        const weapen = await store.showcurrent(req.params.id);
        return res.status(200).json(weapen);
    }
    catch (err) {
        res.status(400);
        res.json(`products cannot be creted because ${err}`);
    }
};
const create = async (req, res) => {
    const OrderStore = {
        id: req.body.id,
        status: req.body.status,
        user_id: req.body.user_id,
        products_id: req.body.products_id,
        quantity: req.body.quantity
    };
    try {
        const weapen = await store.create(OrderStore);
        res.status(200).json(weapen);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const delet = async (req, res) => {
    const weapen = await store.delete(req.params.id);
    res.json(weapen);
};
const addProduct = async (_req, res) => {
    const orderId = _req.params.id;
    const productId = _req.body.productId;
    const quantity = parseInt(_req.body.quantity);
    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const myorder = (app) => {
    app.get('/orders', verify_1.default, index);
    app.get('/orders/:id', verify_1.default, showcurrent);
    app.post('/orders', verify_1.default, create);
    app.delete('/orders/:id', delet);
    app.post('/orders/:id/products', addProduct);
};
exports.default = myorder;
