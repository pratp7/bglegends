import React from "react";
import classes from "./Header.module.scss";
import bgLogo from "./bg-logo.png";
import cartLogo from "./cart.svg";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
const Header = () => {
  const cart = useSelector((state) => state.cartProducts.cartProducts);
  const navigate = useNavigate();

  const cartHandler = () => {
    navigate("user-cart");
  };
  return (
    <header>
      <div className={classes.banner}>FREE SHIPPING ON ALL ORDERS</div>
      <nav className={classes.nav}>
        <img className={classes.logo} src={bgLogo} alt="bg_legends_logo" />

        <input type="text" placeholder="what are you looking for?" />
        <Link to="sign-in">Login/Signup</Link>
        <div onClick={cartHandler}>
          <img className={classes.cart} src={cartLogo} alt="cart_logo" />
          <span>{cart.total_items || 0}</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
//Header

/*
TODO: create a free delivery banner

TODO: create user actions with logo 
        Logo
        search box
        loginsignup 
        cart


*/
