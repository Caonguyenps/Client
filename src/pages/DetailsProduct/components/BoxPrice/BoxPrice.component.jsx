import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import "./box.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import { addToCart } from "../../../../api/product.api";
import { checkLogin } from '../../../../auth/auth';
import { useHistory } from "react-router-dom";
import path from "../../../../resources/path";
const BoxPriceComponent = (props) => {
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);

  const handleClick = (type) => {
    if (type == 1) {
      setQuantity(quantity + 1);
    } else if (type == 2) {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const handleClickAddCart = async (product) => {
    console.log(await checkLogin());
    if(!await checkLogin()){
      history.push(path.LOGIN)
    }
    const data = {
      productID: product._id,
      quantity: quantity,
    }
    props.handleLoading(true);

    await addToCart(data).then(res => {
      console.log(res);
      props.handleLoading(false);
    })
  }
  return (
    <Grid className="wrap-box-price">
      <Grid container spacing={1}>
        <Grid item lg={6} className="price-product">
          <span>
            {props?.data?.product?.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </Grid>
        <Grid item lg={3}>
          <Grid className="wrap-btn-price">
            <Grid className="price-item">
              <IconButton
                size="small"
                onClick={() => {
                  handleClick(1);
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid className="price-item">
              <span>{quantity}</span>
            </Grid>
            <Grid className="price-item">
              <IconButton
                size="small"
                onClick={() => {
                  handleClick(2);
                }}
              >
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3}>
          <div className="btn-cart">
            <div className="btn-cart-item">
              <AddIcon />
            </div>
            <div className="btn-cart-item btn-add-cart" onClick={() => {
              handleClickAddCart(props?.data?.product)
            }}>
              <span> Add to cart</span>
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BoxPriceComponent;
