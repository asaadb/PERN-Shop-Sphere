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

it('should remove an item from the cart', () => {
  const initialState = [
    { id: 1, product_id: 1, name: 'Test Product', quantity: 2 },
    { id: 2, product_id: 2, name: 'Another Product', quantity: 1 },
  ];
  const action = {
    type: 'REMOVE_ITEM',
    payload: 1, // id of the item to remove
  };
  const newState = cartReducer(initialState, action);

  expect(newState).toHaveLength(1);
  expect(newState[0].id).toBe(2);
  expect(newState[0].name).toBe('Another Product');
});

it('should clear all items from the cart', () => {
  const initialState = [
    { id: 1, product_id: 1, name: 'Test Product', quantity: 2 },
    { id: 2, product_id: 2, name: 'Another Product', quantity: 1 },
  ];
  const action = {
    type: 'CLEAR_CART',
  };
  const newState = cartReducer(initialState, action);

  expect(newState).toHaveLength(0);
});
