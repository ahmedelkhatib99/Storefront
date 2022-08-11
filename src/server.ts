import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import productsRoutes from './handlers/product'
import usersRoutes from './handlers/user'
import ordersRoutes from './handlers/order'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(cors())
app.use(bodyParser.json())


app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})


productsRoutes(app);
usersRoutes(app);
ordersRoutes(app);


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
