import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
import verifyAuthToken from '../services/jwt';


const orderStore = new OrderStore();


const index = async(_req: Request, res: Response) => {
    const orders = await orderStore.index();
    res.json(orders)
}

const show = async(req: Request, res: Response) => {
    const order = await orderStore.show(req.params.id);
    res.json(order)
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            id: req.body.id,
            status: req.body.status,
            user_id: req.body.user_id
        }

        const newOrder = await orderStore.create(order)
        res.json(newOrder)
    } catch(error) {
        let message = 'Unknown Error';
        if (error instanceof Error) message = error.message;
        res.status(400).json({ status: 0, message });
    }
}


const userOrders = async(req: Request, res: Response) => {
    const orders = await orderStore.userOrders(req.params.user_id);
    res.json(orders)
}


const deleteOrder = async(req: Request, res: Response) => {
    const order = await orderStore.delete(req.params.id);
    res.json(order)
}



const ordersRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', verifyAuthToken, create);
    app.get('/orders/users/:user_id', verifyAuthToken, userOrders);
    app.delete('/orders/:id', deleteOrder);
}

export default ordersRoutes;