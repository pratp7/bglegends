import React from "react";
import classes from "./Footer.module.scss";
import email from "../../../logos/gmail.png";
import facebook from "../../../logos/facebook.png";
import instagram from "../../../logos/instagram.png";
import twitter from "../../../logos/twitter.png";
import whatsapp from "../../../logos/whatsapp.png";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className={classes.layoutFooter}>
      <footer>
        <section className={classes.contactDiv}>
          <article className={classes.contact}>
            <h4>Get in Touch with us:</h4>
            <div>
              <img src={email} alt="email" />{" "}
              <a
                href="mailto:bglegendsshop@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                bglegendsshop@gmail.com
              </a>
            </div>
            <div>
              <img src={whatsapp} alt="whatsapp" /> <p>+91 9987564321</p>
            </div>
          </article>
          <article className={classes.social}>
            <h4>Follow us here:</h4>
            <div>
              <img src={facebook} alt="facebook" />
              <img src={instagram} alt="instagram" />
              <img src={twitter} alt="twitter" />
            </div>
          </article>
          <h3>We usually reply within 4 hours</h3>
        </section>

        <div className={classes.copyRight}>
          &copy; <i>BG legends.</i> {year} All Rights Reserved/
        </div>
      </footer>
    </div>
  );
};

export default Footer;
