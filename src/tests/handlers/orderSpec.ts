import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserStore } from '../../models/user';
dotenv.config();

const request = supertest(app);

const tokenSecret = process.env.TOKEN_SECRET as string;
const token = jwt.sign({ id: "2" }, tokenSecret);

const userStore = new UserStore();

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
        .set({ Authorization: 'Bearer '+ token })
        expect(response.status).toBe(200);
    });

    it('index should respond with status 200', async () => {
        const response = await request.get('/orders')
        .set({ Authorization: 'Bearer '+ token });
        expect(response.status).toBe(200);
    });

    it('show should respond with status 200', async () => {
        const response = await request.get('/orders/2')
        .set({ Authorization: 'Bearer '+ token });
        expect(response.status).toBe(200);
    });

    it('userOrders should respond with status 200', async () => {
        const response = await request.get('/orders/users/2')
        .set({ Authorization: 'Bearer '+ token })
        expect(response.status).toBe(200);
    });

    it('delete should respond with status 200', async () => {
        const response = await request.delete('/orders/2')
        .set({ Authorization: 'Bearer '+ token });
        expect(response.status).toBe(200);
    });

})