import React from "react";
import classes from "./CartHeader.module.scss";
import bgLogo from "../../LandingPage/Header/bg-logo.png";
import { Link, useNavigate } from "react-router-dom";

const CartHeader = () => {
  const navigate = useNavigate();
  const logoHandler = () => {
    navigate("/");
  };
  return (
    <div>
      <header>
        <div className={classes.banner}>FREE SHIPPING ON ALL ORDERS</div>
        <nav className={classes.nav}>
          <img
            className={classes.logo}
            src={bgLogo}
            alt="bg_legends_logo"
            onClick={logoHandler}
          />
          <Link to="/">Go to Products</Link>
          <Link to="/user-cart">Shopping Cart</Link>
        </nav>
      </header>
    </div>
  );
};

export default CartHeader;
