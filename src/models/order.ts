import client from '../datbase'


export type Order = {
    id: number;
    status: string;
    user_id: number;
}


export class OrderStore {

    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
            
        } catch (error) {
            throw new Error(`Could not get orders. Error: ${error}`)
        }
    }


    async show(id: string): Promise<Order> {
        try {
            const conn = await client.connect();    
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);

            conn.release();
            return result.rows[0];

        } catch (error) {
            throw new Error(`Could not find order ${id}. Error: ${error}`)
        }
    }


    async create(o: Order): Promise<Order> {
        try {
            const conn = await client.connect()
            const sql = 'INSERT INTO orders (id, status, user_id) VALUES($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [o.id, o.status, o.user_id])
        
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not add new order. Error: ${error}`)
        }
    }


    async userOrders(user_id: string): Promise<Order[]> {
        try {
            const conn = await client.connect();    
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const result = await conn.query(sql, [user_id]);

            conn.release();
            return result.rows;

        } catch (error) {
            throw new Error(`Could not find order of user with id ${user_id}. Error: ${error}`)
        }
    }


    async delete(id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *'
            const conn = await client.connect()        
            const result = await conn.query(sql, [id])

            conn.release()
            return result.rows[0]

        } catch (error) {
            throw new Error(`Could not delete order ${id}. Error: ${error}`)
        }
    }

}