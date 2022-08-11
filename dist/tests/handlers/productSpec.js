"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const request = (0, supertest_1.default)(server_1.default);
const tokenSecret = process.env.TOKEN_SECRET;
const token = jsonwebtoken_1.default.sign({ id: "2" }, tokenSecret);
describe("Product Handler", () => {
    it('create should respond with status 200', async () => {
        const response = await request.post('/products')
            .send({
            id: 2,
            product_name: 'wire',
            price: 100,
            category: 'electricity'
        })
            .set({ Authorization: 'Bearer ' + token });
        expect(response.status).toBe(200);
    });
    it('index should respond with status 200', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });
    it('show should respond with status 200', async () => {
        const response = await request.get('/products/2');
        expect(response.status).toBe(200);
    });
    it('categoryProducts should respond with status 200', async () => {
        const response = await request.post('/products/category')
            .send({
            category: "electricity"
        });
        expect(response.status).toBe(200);
    });
    it('delete should respond with status 200', async () => {
        const response = await request.delete('/products/2');
        expect(response.status).toBe(200);
    });
});
