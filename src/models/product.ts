import client from '../datbase'


export type Product = {
    id: number;
    product_name: string;
    price: number;
    category: string;
}


export class ProductStore {

    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
            
        } catch (error) {
            throw new Error(`Could not get products. Error: ${error}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const conn = await client.connect();    
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);

            // if (result.rowCount == 0) {
            //     throw new Error(`Product with id: ${id} does not exist`)
            // }
        
            conn.release();
            return result.rows[0];

        } catch (error) {
            throw new Error(`Could not find product ${id}. Error: ${error}`)
        }
    }


    async create(p: Product): Promise<Product> {
        try {
            const conn = await client.connect()
            const sql = 'INSERT INTO products (id, product_name, price, category) VALUES($1, $2, $3, $4) RETURNING *'
            const result = await conn.query(sql, [p.id, p.product_name, p.price, p.category])
        
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not add new product. Error: ${error}`)
        }
    }


    async categoryProducts(category: string): Promise<Product[]> {
        try {
            const conn = await client.connect();    
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await conn.query(sql, [category]);

            conn.release();
            return result.rows;

        } catch (error) {
            throw new Error(`Could not find product of category ${category}. Error: ${error}`)
        }
    }

}