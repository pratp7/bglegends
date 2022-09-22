import React from "react";
import classes from "./Cart.module.scss";
import CartHeader from "../Layout/CartHeader/CartHeader";
import CartProducts from "./CartProducts/CartProducts";
import Footer from "../Layout/Footer/Footer";
const Cart = () => {
  return (
    <div className={classes.cart}>
      <CartHeader />
      <CartProducts />
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Cart;
