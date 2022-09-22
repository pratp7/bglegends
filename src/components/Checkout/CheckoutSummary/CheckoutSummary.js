import React, { useEffect } from "react";
import classes from "./CheckoutSummary.module.scss";
import { fetchCart } from "../../../store/cartReducers/cartThunk";
import { useSelector, useDispatch } from "react-redux";
const CheckoutSummary = () => {
  const cartItems = useSelector((state) => state.cartProducts.cartProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      <div className={classes.summary}>
        <h2>Order Summary:</h2>
        {cartItems.line_items &&
          cartItems.line_items.map((cartItem) => (
            <section className={classes.summaryCard} key={cartItem.id}>
              <img src={cartItem.image.url} alt={cartItem.name} />
              <h3>{cartItem.name}</h3>
              <p>Qty:{cartItem.quantity}</p>
              <p>
                Rs.
                {cartItem.price.raw * cartItem.quantity}
              </p>
            </section>
          ))}
        <div>
          {cartItems.total_items !== 0 && cartItems.subtotal && (
            <h2>Subtotal: {cartItems.subtotal.formatted_with_symbol}</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutSummary;
