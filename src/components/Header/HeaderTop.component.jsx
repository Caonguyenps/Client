import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import path from "../../resources/path";
import { useHistory } from "react-router-dom";

const HeaderTopComponent = () => {
  const history = useHistory();
  const handleClick = (slug) => {
    history.push(slug);
  };
  return (
    <Grid className="header-top">
      <Grid container spacing={1}>
        <Grid item lg={4}>
          <span className="ml-5">+84 0981 424 285</span>
          <span className="ml-5">phamcaonguyen03032000@gmail.com</span>
        </Grid>
        <Grid item lg={4}></Grid>
        <Grid item lg={4}>
          <div className="header-top-right">
            <span
              className="mr-5"
              onClick={() => {
                handleClick(path.ABOUT);
              }}
            >
              About Us
            </span>
          </div>
        </Grid>
      </Grid>
      <hr />
    </Grid>
  );
};

export default HeaderTopComponent;
