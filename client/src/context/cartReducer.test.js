import { describe, it, expect } from 'vitest';
import cartReducer from './cartReducer';
it('should add an item to the cart', () => {
  const initialState = [];
  const action = {
    type: 'ADD_ITEM',
    payload: { id: 1, product_id: 1, name: 'Test Product', quantity: 2 },
  };
  const newState = cartReducer(initialState, action);

  expect(newState).toHaveLength(1);
  expect(newState[0].name).toBe('Test Product');
  expect(newState[0].quantity).toBe(2);
});

it('should update the quantity of an existing item', () => {
  const initialState = [
    { id: 1, product_id: 1, name: 'Test Product', quantity: 2 },
  ];
  const action = {
    type: 'UPDATE_ITEM',
    payload: { id: 1, quantity: 5 },
  };
  const newState = cartReducer(initialState, action);

  expect(newState).toHaveLength(1);
  expect(newState[0].quantity).toBe(5);
});

