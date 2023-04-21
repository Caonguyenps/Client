import { Grid } from "@material-ui/core";
import React from "react";
import ButtonBannerComponent from "../Button/ButtonBanner.component";
import "./banner.css";
const BannerComponent = (props) => {
  return (
    <Grid>
      <div className="wrap-banner">
        <div className="img-banner">
          <img src={props?.data.image.url} alt="" width="100%" height="100%" />
        </div>
        <div className="content-banner">
          <div className="title-content">
            <span>{props?.data.bannerTitle}</span>
          </div>
          <div className="text-content">
            <span>{props?.data.bannerContent}</span>
          </div>
          <div>
            <ButtonBannerComponent />
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default BannerComponent;
