import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; Nitin kumar</p>
      </div>

      <div className="rightFooter">
        <h4>Contact Me</h4>
        <a
          href="https://nitinkumargits.github.io/Portfolio-Official/"
          target="blank">
          Portfolio
        </a>
        <a
          href="https://www.linkedin.com/in/nitin-kumar-b0362b27a/"
          target="blank">
          Linkedin
        </a>
        <a href="mailto:nitinkwork18@gmail.com" target="blank">
          Mail
        </a>
      </div>
    </footer>
  );
};
export default Footer;
