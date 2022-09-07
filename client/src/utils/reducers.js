import { useReducer } from 'react';
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    // if action type is UPDATE_PRODUCTS, 
    // ⇒　return a new state object with updated array of "products" 
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    // if action type is UPDATE_CART_QUANTITY, 
    // ⇒　return a new state object if "cartOpen" boolean statement is true,
    // map a new array that will be populated by res 
    // if the action id matches the product id, they're essentially equal
    // ⇒ return updated product inside of "cart" 
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };


    // if action type is REMOVE_FROM_CART, 
    // set a new state of "cart" by filter() the array 
    // ⇒　return a set of products in "cart" with diferent product id and action id
    // under a condition: 
    // number of elememts in cart must be greater than 0
    // then set "cart" value = "newState"
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    
    // if none of these actions are performed, 
    // DON'T update the state at all and keep things the same
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
