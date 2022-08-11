"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const datbase_1 = __importDefault(require("../datbase"));
class OrderStore {
    async index() {
        try {
            const conn = await datbase_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get orders. Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await datbase_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find order ${id}. Error: ${error}`);
        }
    }
    async create(o) {
        try {
            const conn = await datbase_1.default.connect();
            const sql = 'INSERT INTO orders (id, status, user_id) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [o.id, o.status, o.user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not add new order. Error: ${error}`);
        }
    }
    async userOrders(user_id) {
        try {
            const conn = await datbase_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not find order of user with id ${user_id}. Error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const conn = await datbase_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not delete order ${id}. Error: ${error}`);
        }
    }
}
exports.OrderStore = OrderStore;
