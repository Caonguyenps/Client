import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { getProductHomeType } from "../../../../api/product.api";
import ProductComponent from "../../../../components/Product/Product.component";
import CategoryComponent from "../Category/Category.component";
import "./wrapProduct.css";
const WrapProductComponent = () => {
  const [listsProduct, setListsProduct] = useState([]);
  useEffect(async () => {
    await getProductHomeType(1).then((res) => {
      setListsProduct(res.data);
    });
  }, []);

  const showListsProduct = listsProduct.map((e, index) => {
    return (
      <Grid item lg={4} key={index}>
        <ProductComponent data={e} />
      </Grid>
    );
  });

  return (
    <Grid className="wrap-product-home wrap-body">
      <Grid container>
        <Grid item lg={3}>
          <CategoryComponent />
        </Grid>
        <Grid item lg={9}>
          <Grid container spacing={1}>
            {showListsProduct}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WrapProductComponent;
