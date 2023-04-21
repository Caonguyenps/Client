import React from "react";
import Grid from "@material-ui/core/Grid";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import logo from "../../assets/image/Toto.png";
import { useHistory } from "react-router-dom";

import "./footer.css";

const FooterComponent = () => {
  const history = useHistory();
  const handleClickLogo = () => {
    sessionStorage.clear();
    history.push("/");
  };
  return (
    <div id="footer" className="wrap-body">
      <hr />
      <div>
        <div className="row">
          <div className="col-6">
            <div className="footer-content-left">
              <div className="footer-content-left-name">
                <Grid>
                  <div className="header-logo" onClick={handleClickLogo}>
                    <img src={logo} alt="" />
                  </div>
                </Grid>
              </div>
            </div>
            <div className="content-item-1 mt-4">
              <i class="fa-solid fa-house"></i>
              <span>ToTo General Trading Service Joint Stock Company</span>
            </div>
            <div className="content-item">
              <i class="fa-solid fa-phone"></i>
              <span>0981 42 4285</span>
            </div>
            <div className="content-item">
              <i class="fa-solid fa-envelope"></i>
              <span>nguyenpcgcc18074@gmail.com</span>
            </div>
            <div className="content-item">
              <i class="fa-solid fa-address-book"></i>
              <span>
                M.S.D.N: 0981 42 4285, issue date: April 20, 2023, the
                University of Greenwich Vietnam Can Tho campus
              </span>
            </div>
            <div className="footer-content-left-name-1">
              <span>Pham Nguyen</span>
            </div>
          </div>
          <div className="col-6">
            <div className="footer-content-right">
              <div className="footer-content-right-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.854118926643!2d105.77315962302441!3d10.028894669902312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a062a8990f568d%3A0x2a22d599b2c06b23!2zxJDhuqFpIEjhu41jIEdyZWVud2ljaCAoVmnhu4d0IE5hbSkgLSBDxqEgc-G7nyBD4bqnbiBUaMah!5e0!3m2!1svi!2sus!4v1679588278950!5m2!1svi!2sus"
                  width={577}
                  height={245}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="icon">
                <FacebookIcon />
                <InstagramIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
