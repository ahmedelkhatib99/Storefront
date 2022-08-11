import { Product, ProductStore } from '../../models/product'

const productStore = new ProductStore();


describe("Product Model", () => {
    it('should have an index method', () => {
        expect(productStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(productStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(productStore.create).toBeDefined();
    });

    it('should have a categoryProducts method', () => {
        expect(productStore.categoryProducts).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(productStore.delete).toBeDefined();
    });


    it('create method should return a product', async () => {
        const result = await productStore.create({
            id: 1,
            product_name: 'cable', 
            price: 100, 
            category: 'electricity' 
        });
        expect(result).toEqual({
            id: 1,
            product_name: 'cable', 
            price: 100, 
            category: 'electricity' 
        });
    });

    it('index method should return a list of products', async () => {
        const result = await productStore.index();
        expect(result.length).not.toEqual(0);
    });

    it('show method should return a product', async () => {
        const result = await productStore.show("1");
        expect(result).toEqual({
            id: 1,
            product_name: 'cable', 
            price: 100, 
            category: 'electricity' 
        });
    });

    it('categoryProducts method should return products by category', async () => {
        const result = await productStore.categoryProducts("electricity");
        expect(result[0]).toEqual({
            id: 1,
            product_name: 'cable', 
            price: 100, 
            category: 'electricity' 
        });
    });

    it('delete method should delete a product', async () => {
        const result = await productStore.delete("1");
        expect(result).toEqual({
            id: 1,
            product_name: 'cable', 
            price: 100, 
            category: 'electricity' 
        });
    });

})