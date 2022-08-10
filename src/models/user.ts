import client from '../datbase'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config();


export type User = {
    id: number;
    first_name: string;
    last_name: string;
    user_password: string;
}


export class UserStore {

    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT id, first_name, last_name FROM users';
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
            
        } catch (error) {
            throw new Error(`Could not get users. Error: ${error}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await client.connect();    
            const sql = 'SELECT id, first_name, last_name FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
        
            conn.release();
            return result.rows[0];

        } catch (error) {
            throw new Error(`Could not find user ${id}. Error: ${error}`)
        }
    }


    async create(u: User): Promise<User> {
        try {
            const conn = await client.connect()
            const sql = 'INSERT INTO users (id, first_name, last_name, user_password) VALUES($1, $2, $3, $4) RETURNING *'
            //hash password
            const pepper = process.env.BCRYPT_PEPPER;
            const saltRounds = process.env.SALT_ROUNDS as string;
            const hashedPassword = bcrypt.hashSync(u.user_password + pepper, parseInt(saltRounds));
            //create user with hashed password
            const result = await conn.query(sql, [u.id, u.first_name, u.last_name, hashedPassword])
        
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not add new user. Error: ${error}`)
        }
    }

}