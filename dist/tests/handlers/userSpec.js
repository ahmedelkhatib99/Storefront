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
describe("User Handler", () => {
    it('create should respond with status 200', async () => {
        const response = await request.post('/users')
            .send({
            id: 3,
            first_name: 'atef',
            last_name: 'aly',
            user_password: '123456'
        })
            .set({ Authorization: 'Bearer ' + token });
        expect(response.status).toBe(200);
    });
    it('index should respond with status 200', async () => {
        const response = await request.get('/users').set({ Authorization: 'Bearer ' + token });
        expect(response.status).toBe(200);
    });
    it('show should respond with status 200', async () => {
        const response = await request.get('/users/3').set({ Authorization: 'Bearer ' + token });
        expect(response.status).toBe(200);
    });
    it('delete should respond with status 200', async () => {
        const response = await request.delete('/users/3');
        expect(response.status).toBe(200);
    });
});
