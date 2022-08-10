import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import verifyAuthToken from '../services/jwt';


const productStore = new ProductStore();


const index = async(_req: Request, res: Response) => {
    const products = await productStore.index();
    res.json(products)
}

const show = async(req: Request, res: Response) => {
    const product = await productStore.show(req.params.id);
    res.json(product)
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            id: req.body.id,
            product_name: req.body.product_name,
            price: req.body.price,
            category: req.body.category
        }

        const newProduct = await productStore.create(product)
        res.json(newProduct)
    } catch(error) {
        let message = 'Unknown Error';
        if (error instanceof Error) message = error.message;
        res.status(400).json({ status: 0, message });
    }
}




const productsRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
}

export default productsRoutes;