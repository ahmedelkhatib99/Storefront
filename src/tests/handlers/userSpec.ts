import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const request = supertest(app);


const tokenSecret = process.env.TOKEN_SECRET as string;
const token = jwt.sign({ id: "2" }, tokenSecret);


describe("User Handler", () => {

    it('create should respond with status 200', async () => {
        const response = await request.post('/users')
        .send({
                id: 3,
                first_name: 'atef', 
                last_name: 'aly',
                user_password: '123456'
            })
        .set({ Authorization: 'Bearer '+ token })
        expect(response.status).toBe(200);
    });

    it('index should respond with status 200', async () => {
        const response = await request.get('/users').set({ Authorization: 'Bearer '+ token });
        expect(response.status).toBe(200);
    });

    it('show should respond with status 200', async () => {
        const response = await request.get('/users/3').set({ Authorization: 'Bearer '+ token });
        expect(response.status).toBe(200);
    });

    it('delete should respond with status 200', async () => {
        const response = await request.delete('/users/3');
        expect(response.status).toBe(200);
    });

})