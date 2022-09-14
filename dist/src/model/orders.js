"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const process_1 = require("process");
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async addProduct(quantity, orderId, productId) {
        // get order to see if it is open
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)';
            // @ts-expect-error
            const conn = await Client.connect();
            const result = await conn.query(ordersql, [orderId]);
            const order = result.rows[0];
            if (order.status !== 'open') {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`);
            }
            conn.release();
        }
        catch (err) {
            throw new Error(`${err}`);
        }
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            // @ts-expect-error
            const conn = await Client.connect();
            const result = await conn
                .query(sql, [quantity, orderId, productId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
        }
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            void conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    async showcurrent(user_id) {
        try {
            const conn = (await database_1.default.connect());
            const sql = 'SELECT * FROM orders WHERE user_id=($1) ORDER BY id DESC';
            const result = (await conn.query(sql, [user_id]));
            void conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${user_id}. Error: ${err}`);
        }
    }
    async create(b) {
        try {
            const sql = 'INSERT INTO orders (id, status, user_id, products_id, quantity) VALUES($1, $2, $3, $4, $5) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [b.id, b.status, b.user_id, b.products_id, b.quantity]);
            const order = result.rows[0];
            if (order.status !== ('open' || 'active')) {
                throw new Error(`Could not  order ${b.id} because order status is ${b.status}`);
            }
            void conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order ${process_1.title}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            void conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
