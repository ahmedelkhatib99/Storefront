"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const datbase_1 = __importDefault(require("../datbase"));
class ProductStore {
    async index() {
        try {
            const conn = await datbase_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get products. Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await datbase_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            // if (result.rowCount == 0) {
            //     throw new Error(`Product with id: ${id} does not exist`)
            // }
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find product ${id}. Error: ${error}`);
        }
    }
    async create(p) {
        try {
            const conn = await datbase_1.default.connect();
            const sql = 'INSERT INTO products (id, product_name, price, category) VALUES($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [p.id, p.product_name, p.price, p.category]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not add new product. Error: ${error}`);
        }
    }
    async categoryProducts(category) {
        try {
            const conn = await datbase_1.default.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not find product of category ${category}. Error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const conn = await datbase_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not delete product ${id}. Error: ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
