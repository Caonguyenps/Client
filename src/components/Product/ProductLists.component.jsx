import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./product.css";
import { useHistory } from "react-router-dom";
import path from "../../resources/path";
import ButtonWishListComponent from "../Button/ButtonWishList.component";
import { getUserID } from "../../helper/token";
import { addWishList, removeWishList } from "../../api/user.api";
const ProductListsComponent = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSuccess(props.wishList);
  }, [props.wishList]);

  const handleClick = (id) => {
    history.push(`${path.DEFAULT_DETAIL_PRODUCT}/${id}`);
  };

  const handleClickWishList = async () => {
    const data = {
      ownerID: getUserID(),
      productID: props.data._id,
    };
    setLoading(true);
    if (success) {
      await removeWishList(data).then((res) => {
        setLoading(false);
        setSuccess(false);
      });
    } else {
      await addWishList(data).then((res) => {
        setLoading(false);
        setSuccess(true);
      });
    }
    props.handleChangeReload();
  };
  return (
    <Grid>
      <div className="wrap-product-lists">
        <Grid container spacing={1} style={{ height: "100%" }}>
          <Grid item lg={3}>
            <div className="img-product">
              <img
                src={props?.data.image[0].url}
                alt=""
                width="100%"
                height="100%"
              />
            </div>
          </Grid>
          <Grid
            item
            lg={6}
            className="wrap-name-product"
            onClick={() => {
              handleClick(props.data._id);
            }}
          >
            <div className="name-product mt-1">
              <span>{props?.data.productName}</span>
            </div>
            <div className="description-product mt-1">
              <span title={props?.data.introduce}>{props?.data.introduce}</span>
            </div>
          </Grid>
          <Grid item lg={3}>
            <div className="mt-3 bottom-product">
              <span className="price-product">
                {props?.data.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
              <ButtonWishListComponent
                handleClickWishList={handleClickWishList}
                loading={loading}
                success={success}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default ProductListsComponent;
