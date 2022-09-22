import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import classes from "./CartProducts.module.scss";
import { useNavigate } from "react-router";
import {
  fetchCart,
  removeCartItem,
  updateCartQty,
  emptyCart,
} from "../../../store/cartReducers/cartThunk";

const CartProducts = () => {
  const cartItems = useSelector((state) => state.cartProducts.cartProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(cartItems);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const removeCartHandler = (itemID) => {
    dispatch(removeCartItem(itemID));
  };

  const emptyCartHandler = () => {
    dispatch(emptyCart());
  };

  const checkoutHandler = () => {
    navigate("/check-out");
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Shopping Cart:</h2>
      <div className={classes.cartProducts}>
        {cartItems.line_items &&
          cartItems.line_items.map((cartItem) => (
            <section className={classes.card} key={cartItem.id}>
              <img src={cartItem.image.url} alt={cartItem.name} />
              <article>
                <h3>{cartItem.name}</h3>
                <p>
                  <b>Rs.</b>
                  {cartItem.price.raw * cartItem.quantity}
                </p>
              </article>
              <article>
                <div className={classes.buttons}>
                  <button
                    onClick={() =>
                      dispatch(
                        updateCartQty(cartItem.id, cartItem.quantity - 1)
                      )
                    }
                  >
                    -
                  </button>
                  {cartItem.quantity}
                  <button
                    onClick={() =>
                      dispatch(
                        updateCartQty(cartItem.id, cartItem.quantity + 1)
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className={classes.removeButton}
                  onClick={() => removeCartHandler(cartItem.id)}
                >
                  Remove
                </button>
              </article>
            </section>
          ))}
      </div>
      <section className={classes.checkout}>
        {cartItems.total_items !== 0 && cartItems.subtotal && (
          <>
            <h2>Subtotal:{cartItems.subtotal.formatted_with_symbol}</h2>
            <div className={classes.finalButtons}>
              <button onClick={emptyCartHandler}>Empty Cart</button>
              <button className={classes.checkoutBtn} onClick={checkoutHandler}>
                Proceed To Buy (
                {cartItems.total_items > 1
                  ? `${cartItems.total_items} items`
                  : `${cartItems.total_items} item`}{" "}
                )
              </button>
            </div>
          </>
        )}
      </section>

      {cartItems.total_items === 0 && (
        <>
          <h2 className={classes.emptyCartWarning}>
            Shopping Cart is Empty :(
          </h2>
          <h3 className={classes.emptyCartWarning}>Add Items in it</h3>
        </>
      )}
    </>
  );
};

export default CartProducts;
