import React from 'react'
import classes from './Header.module.scss';
import bgLogo from "./bg-logo.png"
import cartLogo from "./cart.svg"
const Header = () => {
    return (
        <div>
            <div className={classes.banner}>FREE SHIPPING ON ALL ORDERS</div>
            <nav className={classes.nav}>
                <img className={classes.logo} src={bgLogo} alt="bg legends logo" />
                <input type="text" placeholder="what are you looking for?" />
                <a href="/">Login/Signup</a>
                <img className={classes.cart} src={cartLogo} alt="cart_logo"/>


            </nav>
            
        </div>
    )
}

export default Header
//Header 

/*
TODO: create a free delivery banner

TODO: create user actions with logo 
        Logo
        search box
        loginsignup 
        cart


*/ 