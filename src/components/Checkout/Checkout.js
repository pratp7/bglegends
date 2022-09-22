import React from "react";
import classes from "./Checkout.module.scss";
import Footer from "../Layout/Footer/Footer";
import CartHeader from "../Layout/CartHeader/CartHeader";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import CheckoutSummary from "./CheckoutSummary/CheckoutSummary";
const Checkout = () => {
  return (
    <div className={classes.checkout}>
      <CartHeader />
      <h2 style={{ textAlign: "center" }}>Checkout</h2>
      <section>
        <CheckoutForm />
        <CheckoutSummary />
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Checkout;
