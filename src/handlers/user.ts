import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import verifyAuthToken from '../services/jwt';
dotenv.config();


const userStore = new UserStore();


const index = async(_req: Request, res: Response) => {
    const users = await userStore.index();
    res.json(users)
}

const show = async(req: Request, res: Response) => {
    const user = await userStore.show(req.params.id);
    res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_password: req.body.user_password
        }

        const newUser = await userStore.create(user)
        const tokenSecret = process.env.TOKEN_SECRET as string;
        var token = jwt.sign({ user: newUser }, tokenSecret);
        res.json(token)
        
    } catch(error) {
        let message = 'Unknown Error';
        if (error instanceof Error) message = error.message;
        res.status(400).json({ status: 0, message });
    }
}


const deleteUser = async(req: Request, res: Response) => {
    const user = await userStore.delete(req.params.id);
    res.json(user)
}



const usersRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create); //how to add verifytoken here, api won't be accessible
    app.delete('/users/:id', deleteUser);
}

export default usersRoutes;