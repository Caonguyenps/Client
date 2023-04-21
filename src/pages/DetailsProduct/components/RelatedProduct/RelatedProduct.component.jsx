import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getRelatedProduct } from "../../../../api/product.api";
import ProductComponent from "../../../../components/Product/Product.component";
import "./related.css";
import { useHistory } from "react-router-dom";
import path from "../../../../resources/path";
const RelatedProductComponent = (props) => {
  const history = useHistory();
  const [listsProduct, setListsProduct] = useState([]);
  useEffect(async () => {
    if (props.data) {
      let categoryID = props.data.product.categoryID;
      let subCategoryID = props.data.product.subCategoryID;
      let branchID = props.data.product.brandID;

      await getRelatedProduct(categoryID, subCategoryID, branchID).then(
        (res) => {
          setListsProduct(res.data);
        }
      );
    }
  }, [props.data]);
  const showListsProduct = listsProduct.map((e, index) => {
    return (
      <Grid item lg={3}>
        <ProductComponent data={e} />
      </Grid>
    );
  });

  const handleClick = () => {
    let categoryID = props.data.product.categoryID;
    let subCategoryID = props.data.product.subCategoryID;
    let branchID = props.data.product.brandID;
    history.push({
      pathname: `${path.DEFAULT_PRODUCT}/${categoryID}`,
      search: `subCategoryID=${subCategoryID}&branchID=${branchID}`,
    });
  };
  return (
    <Grid className="related-product">
      <button onClick={handleClick}>
        {" "}
        <i class="fa-solid fa-angle-left mr-2"></i>Related product
      </button>
      <Grid container spacing={1} className="related-show-product">
        {showListsProduct}
      </Grid>
    </Grid>
  );
};

export default RelatedProductComponent;
