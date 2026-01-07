const request = require('supertest');
const app = require('../index');

describe('Cart API', () => {
  let sessionId = 'test-session-' + Date.now();
  let productId;
  let cartItemId;

  beforeAll(async () => {
    // Create a product to use in cart tests
    const newProduct = {
      name: 'Cart Test Product',
      description: 'A product for cart testing',
      price: 20.5,
      category_id: 1,
      stock_quantity: 10,
      image_url: 'http://image.jpg',
    };
    const res = await request(app).post('/api/products').send(newProduct);
    productId = res.body.id;
  });

  it('should add an item to the cart', async () => {
    const res = await request(app).post('/api/cart').send({
      session_id: sessionId,
      product_id: productId,
      quantity: 2,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.product_id).toBe(productId);
    expect(res.body.quantity).toBe(2);
    cartItemId = res.body.id;
  });

  it('should fetch the cart for a session', async () => {
    const res = await request(app).get(`/api/cart?session_id=${sessionId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0].product_id).toBe(productId);
  });

  it('should update the quantity of a cart item', async () => {
    const res = await request(app)
      .put(`/api/cart/${cartItemId}`)
      .send({ quantity: 5 });
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(5);
  });

  it('should remove an item from the cart', async () => {
    const res = await request(app).delete(`/api/cart/${cartItemId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  it('should clear the cart for a session', async () => {
    // Add an item again
    const addRes = await request(app).post('/api/cart').send({
      session_id: sessionId,
      product_id: productId,
      quantity: 1,
    });
    expect(addRes.statusCode).toBe(201);
    // Clear cart
    const res = await request(app).delete(`/api/cart?session_id=${sessionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
