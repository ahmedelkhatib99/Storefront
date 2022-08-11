"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const datbase_1 = __importDefault(require("../datbase"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserStore {
    async index() {
        try {
            const conn = await datbase_1.default.connect();
            const sql = 'SELECT id, first_name, last_name FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get users. Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await datbase_1.default.connect();
            const sql = 'SELECT id, first_name, last_name FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find user ${id}. Error: ${error}`);
        }
    }
    async create(u) {
        try {
            const conn = await datbase_1.default.connect();
            const sql = 'INSERT INTO users (id, first_name, last_name, user_password) VALUES($1, $2, $3, $4) RETURNING *';
            //hash password
            const pepper = process.env.BCRYPT_PEPPER;
            const saltRounds = process.env.SALT_ROUNDS;
            const hashedPassword = bcrypt_1.default.hashSync(u.user_password + pepper, parseInt(saltRounds));
            //create user with hashed password
            const result = await conn.query(sql, [u.id, u.first_name, u.last_name, hashedPassword]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not add new user. Error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING id, first_name, last_name';
            const conn = await datbase_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not delete user ${id}. Error: ${error}`);
        }
    }
}
exports.UserStore = UserStore;
