import { cartActions } from "./cartSlice";
import { commerce } from "../../lib/commerce";

export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const cart = await commerce.cart.retrieve();
      console.log("Retrieve", cart);
      dispatch(cartActions.cartInfo(cart || {}));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addCart = (itemID, quantity) => {
  return async (dispatch) => {
    try {
      const cartItem = await commerce.cart.add(itemID, quantity);
      console.log("ADD", cartItem.cart);
      dispatch(cartActions.cartInfo(cartItem.cart));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateCartQty = (itemID, quantity) => {
  return async (dispatch) => {
    try {
      const cartItem = await commerce.cart.update(itemID, { quantity });
      console.log("Update", cartItem.cart);
      dispatch(cartActions.cartInfo(cartItem.cart));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeCartItem = (itemID) => {
  return async (dispatch) => {
    try {
      const cartItem = await commerce.cart.remove(itemID);
      console.log("Removed");
      dispatch(cartActions.cartInfo(cartItem.cart));
    } catch (err) {
      console.log(err);
    }
  };
};

export const emptyCart = () => {
  return async (dispatch) => {
    try {
      const cartItem = await commerce.cart.empty();
      console.log("Empty Cart");
      dispatch(cartActions.cartInfo(cartItem.cart));
    } catch (err) {
      console.log(err);
    }
  };
};
