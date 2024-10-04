import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail"; // Note the capitalization of "Mail"
import LinkedInIcon from "@mui/icons-material/LinkedIn"; // Note the capitalization of "LinkedIn"

const About = () => {
  const visitLinkedIn = () => {
    window.location = "https://nitinkumargits.github.io/Portfolio-Official/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dmsyppekz/image/upload/v1727027172/nitin-Square-pic_omdyuk.jpg"
              alt="Founder"
            />
            <Typography>Nitin Kumar</Typography>
            <Button onClick={visitLinkedIn} color="primary">
              Visit My Portfolio
            </Button>
            <span>
              {`This is an E-commerce website made by @NitinKumar.`}
              <br />
              {`Build on MERN Stack.`}
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Contact Me</Typography>
            <a href="mailto:nitinkwork18@gmail.com" target="blank">
              <MailIcon className="youtubeSvgIcon" />
            </a>

            <a
              href="https://www.linkedin.com/in/nitin-kumar-b0362b27a/"
              target="blank">
              <LinkedInIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
