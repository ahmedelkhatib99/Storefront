import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const request = supertest(app);


const tokenSecret = process.env.TOKEN_SECRET as string;
const token = jwt.sign({ id: "2" }, tokenSecret);


describe("Product Handler", () => {

    it('create should respond with status 200', async () => {
        const response = await request.post('/products')
        .send({
                id: 2,
                product_name: 'wire', 
                price: 100, 
                category: 'electricity'
            })
        .set({ Authorization: 'Bearer '+ token })
        expect(response.status).toBe(200);
    });

    it('index should respond with status 200', async () => {
        const response = await request.get('/products')
        .set({ Authorization: 'Bearer '+ token });
        expect(response.status).toBe(200);
    });

    it('show should respond with status 200', async () => {
        const response = await request.get('/products/2')
        .set({ Authorization: 'Bearer '+ token });
        expect(response.status).toBe(200);
    });

    it('categoryProducts should respond with status 200', async () => {
        const response = await request.post('/products/category')
        .send({
            category: "electricity"
            })
        .set({ Authorization: 'Bearer '+ token });
        expect(response.status).toBe(200);
    });

    it('delete should respond with status 200', async () => {
        const response = await request.delete('/products/2')
        .set({ Authorization: 'Bearer '+ token });
        expect(response.status).toBe(200);
    });

})