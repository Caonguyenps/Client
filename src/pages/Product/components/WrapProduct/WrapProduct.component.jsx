import { Grid } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import {
  getListsProductFiler,
  getListsProductPagi,
} from "../../../../api/product.api";
import ProductComponent from "../../../../components/Product/Product.component";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProductListsComponent from "../../../../components/Product/ProductLists.component";
import { getWishLists } from "../../../../api/user.api";

const WrapProductComponent = (props) => {
  const [listsProduct, setListsProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishLists, setWishLists] = useState([]);
  useEffect(async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);
    props.handleChangeShow(true);
    if (
      props.categoryID &&
      props.page &&
      props.filter.subCategoryID == "" &&
      props.filter.branchID == ""
    ) {
      setListsProduct([]);
      await getListsProductPagi(props.categoryID, props.page).then((res) => {
        setListsProduct(res.data.listsProduct);
        props.setCountProduct(res.data.count);
        setLoading(false);
        props.handleChangeShow(false);
      });
    }
  }, [
    props.page,
    props.categoryID,
    props.filter.subCategoryID,
    props.filter.branchID,
  ]);

  useEffect(async () => {
    if (
      props.filter.subCategoryID != "" ||
      props.filter.branchID != "" ||
      props.filter.price.end != 0
    ) {
      setListsProduct([]);
      if (props.page) {
        setLoading(true);
        props.handleChangeShow(true);
        let data = props.filter;
        data.page = props.page - 1;
        console.log("data", data);
        await getListsProductFiler(data).then((res) => {
          setListsProduct(res.data.listsProduct);
          props.setCountProduct(res.data.count);
          props.handleChangeShow(false);
          setLoading(false);
        });
      }
    }
  }, [
    props.filter.subCategoryID,
    props.filter.branchID,
    props.filter.price.start,
    props.filter.price.end,
    props.page,
  ]);

  useEffect(async () => {
    await getWishLists().then((res) => {
      setWishLists(res.data);
    });
  }, []);

  const showListProduct = listsProduct.map((e, index) => {
    let checkIndex = wishLists.findIndex((el) => {
      return el.productID == e._id;
    });
    if (props.viewsType == 1) {
      return (
        <Grid item lg={4} key={index}>
          <ProductComponent data={e} />
        </Grid>
      );
    } else if (props.viewsType == 2) {
      return (
        <Grid item lg={12} key={index}>
          <ProductListsComponent
            data={e}
            wishList={checkIndex != -1 ? true : false}
          />
        </Grid>
      );
    }
  });

  return (
    <Grid>
      <Grid container spacing={1}>
        {loading ? (
          <div className="loading">
            <CircularProgress color="primary" />
          </div>
        ) : listsProduct.length == 0 ? (
          <div class="loading">
            <span>No product</span>
          </div>
        ) : (
          showListProduct
        )}
      </Grid>
    </Grid>
  );
};

export default WrapProductComponent;
