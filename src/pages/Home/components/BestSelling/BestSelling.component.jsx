import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
  getDailyProductHome,
  getProductHomeType,
} from "../../../../api/product.api";
import ProductComponent from "../../../../components/Product/Product.component";
import "./selling.css";
const BestSellingComponent = (props) => {
  const [listsProduct, setListsProduct] = useState([]);
  const [title, setTitle] = useState([
    {
      title: "Best Selling",
    },
    {
      title: "Daily Discover",
    },
  ]);
  const [type, setType] = useState();
  useEffect(async () => {
    if (props.type == 0 || props.type == 1) {
      if (props.type == 0) {
        await getProductHomeType(2).then((res) => {
          setListsProduct(res.data);
        });
      } else {
        await getDailyProductHome().then((res) => {
          setListsProduct(res.data);
        });
      }

      setType(props.type);
    }
  }, [props.type]);

  const showListsProduct = listsProduct.map((e, index) => {
    return (
      <Grid item lg={3}>
        <ProductComponent data={e} />
      </Grid>
    );
  });
  const handleClick = (type) => {
    // if(type == 0){
    //   history.pushState()
    // }
  };
  const showTitle = () => {
    return (
      <div className="header-product">
        <div className="title-left">
          <span>{title[type]?.title}</span>
        </div>
        <div className="btn-right" onClick={() => handleClick(type)}>
          <span>More product </span>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    );
  };
  return (
    <Grid className=" wrap-body wrap-selling-product ">
      {showTitle()}
      <Grid container spacing={1}>
        {showListsProduct}
      </Grid>
    </Grid>
  );
};

export default BestSellingComponent;
