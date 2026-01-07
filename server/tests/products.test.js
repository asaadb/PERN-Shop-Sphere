const request = require('supertest');
const app = require('../index');
describe('Products API', () => {
  it('should fetch all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should fetch a single product by ID', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('price');
    expect(res.body).toHaveProperty('category_id');
    expect(res.body).toHaveProperty('stock_quantity');
    expect(res.body).toHaveProperty('image_url');
    expect(res.body).toHaveProperty('created_at');
    expect(res.body).toHaveProperty('updated_at');
    expect(res.body).toHaveProperty('category_name');
  });

  it('should create a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      description: 'A product for testing',
      price: 15.91,
      category_id: 1,
      stock_quantity: 10,
      image_url: 'http://image.jpg',
    };

    const res = await request(app).post('/api/products').send(newProduct);

    expect(res.statusCode).toBe(201);
    console.log(typeof res.body, res.body);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(newProduct.name);
    expect(res.body.price).toBe(newProduct.price.toString());
    expect(res.body.category_id).toBe(newProduct.category_id);
    expect(res.body.stock_quantity).toBe(newProduct.stock_quantity);
    expect(res.body.image_url).toBe(newProduct.image_url);
  });

  it('should update an existing product', async () => {
    // create a product to update
    const newProduct = {
      name: 'Product to Update',
      description: 'Original description',
      price: 100.0,
      category_id: 1,
      stock_quantity: 5,
      image_url: 'http://image/original.jpg',
    };

    const res = await request(app).post('/api/products').send(newProduct);

    const productId = res.body.id;

    // update the product
    const updatedProduct = {
      name: 'Updated Product',
      description: 'Updated description',
      price: 50.28,
      category_id: 1,
      stock_quantity: 10,
      image_url: 'http://image/updated.jpg',
    };

    const resUpdate = await request(app)
      .put(`/api/products/${productId}`)
      .send(updatedProduct);

    expect(resUpdate.statusCode).toBe(200);
    expect(resUpdate.body.name).toBe(updatedProduct.name);
    expect(resUpdate.body.description).toBe(updatedProduct.description);
    expect(resUpdate.body.price).toBe(updatedProduct.price.toString());
    expect(resUpdate.body.stock_quantity).toBe(updatedProduct.stock_quantity);
    expect(resUpdate.body.image_url).toBe(updatedProduct.image_url);
  });

  it('should delete a product', async () => {
    // First, create a product to delete
    const createRes = await request(app).post('/api/products').send({
      name: 'Delete Me',
      description: 'To be deleted',
      price: 10,
      category_id: 1,
      stock_quantity: 1,
      image_url: 'test.jpg',
    });
    const productId = createRes.body.id;

    const deleteRes = await request(app).delete(`/api/products/${productId}`);
    expect(deleteRes.status).toBe(200);
    const getRes = await request(app).get(`/api/products/${productId}`);
    expect(getRes.status).toBe(404);
  });
});
