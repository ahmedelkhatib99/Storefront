"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../../models/user");
dotenv_1.default.config();
const request = (0, supertest_1.default)(server_1.default);
const tokenSecret = process.env.TOKEN_SECRET;
const token = jsonwebtoken_1.default.sign({ id: "2" }, tokenSecret);
const userStore = new user_1.UserStore();
describe("Order Handler", () => {
    it('create should respond with status 200', async () => {
        await userStore.create({
            id: 2,
            first_name: 'omar',
            last_name: 'khaled',
            user_password: '123456'
        });
        const response = await request.post('/orders')
            .send({
            id: 2,
            status: "active",
            user_id: 2
        })
            .set({ Authorization: 'Bearer ' + token });
        expect(response.status).toBe(200);
    });
    it('index should respond with status 200', async () => {
        const response = await request.get('/orders')
            .set({ Authorization: 'Bearer ' + token });
        expect(response.status).toBe(200);
    });
    it('show should respond with status 200', async () => {
        const response = await request.get('/orders/2')
            .set({ Authorization: 'Bearer ' + token });
        expect(response.status).toBe(200);
    });
    it('userOrders should respond with status 200', async () => {
        const response = await request.get('/orders/users/2')
            .set({ Authorization: 'Bearer ' + token });
        expect(response.status).toBe(200);
    });
    it('delete should respond with status 200', async () => {
        const response = await request.delete('/orders/2')
            .set({ Authorization: 'Bearer ' + token });
        expect(response.status).toBe(200);
    });
});
