import { Order, OrderStore } from '../../models/order'
import { UserStore } from '../../models/user';

const orderStore = new OrderStore();
const userStore = new UserStore();

describe("Order Model", () => {
    it('should have an index method', () => {
        expect(orderStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(orderStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(orderStore.create).toBeDefined();
    });

    it('should have a userOrders method', () => {
        expect(orderStore.userOrders).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(orderStore.delete).toBeDefined();
    });


    it('create method should return a order', async () => {
        await userStore.create({
            id: 1,
            first_name: 'ahmed', 
            last_name: 'mohamed',
            user_password: '123456' 
        });
        const result = await orderStore.create({
            id: 1,
            status: 'active', 
            user_id: 1 
        });
        expect(result).toEqual({
            id: 1,
            status: 'active', 
            user_id: 1 
        });
    });


    it('index method should return a list of orders', async () => {
        const result = await orderStore.index();
        expect(result.length).not.toEqual(0);
    });

    it('show method should return a order', async () => {
        const result = await orderStore.show("1");
        expect(result).toEqual({
            id: 1,
            status: 'active', 
            user_id: 1 
        });
    });

    it('userOrders method should return orders by category', async () => {
        const result = await orderStore.userOrders("1");
        expect(result[0]).toEqual({
            id: 1,
            status: 'active', 
            user_id: 1 
        });
    });

    it('delete method should delete a order', async () => {
        const result = await orderStore.delete("1");
        expect(result).toEqual({
            id: 1,
            status: 'active', 
            user_id: 1 
        });
    });

})