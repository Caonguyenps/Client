import { Grid } from "@material-ui/core";
import React from "react";
import "./about.css";
const AboutUs = () => {
  return (
    <Grid className="wrap-body">
      <section className="about-section">
        <div className="container">
          <div className="row">
            <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
              <div className="inner-column">
                <div className="sec-title">
                  <h2>ToTo convenience store quality in each product</h2>
                </div>
              </div>
            </div>

            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column wow fadeInLeft">
                <div className="author-desc">
                  <h2>ToTo</h2>
                  <span>Web Developer</span>
                </div>
                <figure className="image-1">
                  <a className="lightbox-image" data-fancybox="images">
                    <img
                      title="Rahul Kumar Yadav"
                      src="https://congluan-cdn.congluan.vn/files/content/2019/04/20/cua-hang-tien-loi-1-0942.jpg"
                      alt=""
                    />
                  </a>
                </figure>
              </div>
            </div>
          </div>
          <div className="sec-title mt-3">
            <h2>We want to lead in innovation & Technology</h2>
          </div>
          <div className="text">
            I work on UI/UX and functionality as well so that a plugin comes
            with proper structure & stunning looks which suit web apps &
            websites.
          </div>
          <div className="text">
            I take a small toolkit here and ride it well so that it is fit for
            your use. One who performs well and looks even better.
          </div>
          <div className="text">
            I here have tried to develop a website that meets the needs of the
            users. To make the user feel comfortable and easy to use, I have
            used simple words and icons that are close to everyone's daily life.
            So that users do not need to learn how to use the website.
          </div>
          <div className="text">
            Here you can also share the content you create, if our technical
            team likes it, then we will also share it on our blog.
          </div>
          <div className="text">
            In the end, I would say keep visiting our website and enjoy the
            quality content.
          </div>
        </div>
      </section>
    </Grid>
  );
};

export default AboutUs;
