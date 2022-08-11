import { User, UserStore } from '../../models/user'

const userStore = new UserStore();

describe("user Model", () => {
    it('should have an index method', () => {
        expect(userStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(userStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(userStore.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(userStore.delete).toBeDefined();
    });


    it('index method should return a list of users', async () => {
        const result = await userStore.index();
        expect(result.length).not.toEqual(0);
    });

    it('show method should return a user', async () => {
        const result = await userStore.show("1");
        expect(result).toEqual({
            id: 1,
            first_name: 'ahmed', 
            last_name: 'mohamed'
        });
    });

    it('delete method should delete a user', async () => {
        const result = await userStore.delete("1");
        expect(result).toEqual({
            id: 1,
            first_name: 'ahmed', 
            last_name: 'mohamed'
        });
    });

})