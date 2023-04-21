import { Grid } from "@material-ui/core";
import React from "react";
import "./product.css";
import { useHistory } from "react-router-dom";
import path from "../../resources/path";
const ProductComponent = (props) => {
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`${path.DEFAULT_DETAIL_PRODUCT}/${id}`);
  };
  return (
    <Grid
      onClick={() => {
        handleClick(props.data._id);
      }}
    >
      <div className="wrap-product">
        <div className="img-product">
          <img
            src={props?.data.image[0].url}
            alt=""
            width="100%"
            height="100%"
          />
        </div>
        <div className="name-product mt-1">
          <span>{props?.data.productName}</span>
        </div>
        <div className="description-product mt-1">
          <span title={props?.data.introduce}>{props?.data.introduce}</span>
        </div>
        <div className="mt-3 bottom-product">
          <span className="price-product">
            {props?.data.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
          <span className="btn-product">Buy now</span>
        </div>
      </div>
    </Grid>
  );
};

export default ProductComponent;
