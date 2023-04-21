import { Grid } from "@material-ui/core";
import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import "./introduce.css";
const IntroduceComponent = (props) => {
  return (
    <Grid className="wrap-introduce">
      <Grid className="productName">
        <span>{props?.data?.product?.productName}</span>
      </Grid>
      <Grid>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating name="read-only" value={4} readOnly />
        </Box>
      </Grid>
      <Grid className="introduce-content">
        <span>{props?.data?.product?.introduce}</span>
      </Grid>
      <Grid className="category-item">
        <Grid className="item-title">
          <span>Category:</span>
        </Grid>
        <Grid>
          <span>{props?.data?.category?.categoryName}</span>
        </Grid>
      </Grid>
      <Grid className="category-item">
        <Grid className="item-title">
          <span>Sub Category:</span>
        </Grid>
        <Grid>
          <span>{props?.data?.category?.subCategory[0]?.subCategoryName}</span>
        </Grid>
      </Grid>
      <Grid className="category-item">
        <Grid className="item-title">
          <span>Branch:</span>
        </Grid>
        <Grid>
          <span>{props?.data?.branch?.branchName}</span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IntroduceComponent;
