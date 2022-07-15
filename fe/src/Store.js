import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      const newItem = action.payload;
      const itemexist = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = itemexist
        ? state.cart.cartItems.map((item) =>
            item._id === itemexist._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
