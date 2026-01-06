// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;

    case 'ADD_ITEM': {
      const existingItemIndex = state.findIndex(
        (item) => item.product_id === action.payload.product_id
      );
      if (existingItemIndex > -1) {
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return updatedCart;
      }
      return [...state, action.payload];
    }

    case 'UPDATE_ITEM':
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload);

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

export default cartReducer;
