import { Grid } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailsProduct } from "../../../api/product.api";
import BreadcrumbsComponents from "../../Product/components/Breadcrumbs/Breadcrumbs.component";
import BoxPriceComponent from "../components/BoxPrice/BoxPrice.component";
import ImageProductComponent from "../components/ImageProduct/ImageProduct.component";
import IntroduceComponent from "../components/Introduce/Introduce.component";
import RelatedProductComponent from "../components/RelatedProduct/RelatedProduct.component";
import TabsComponents from "../components/Tabs/Tabs.component";

const DetailsProductScreens = (props) => {
  const productID = useParams().productID;
  const [product, setProduct] = useState();
  useEffect(async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.handleLoading(true);
    if (productID) {
      await getDetailsProduct(productID).then((res) => {
        setProduct(res.data);
      });
      props.handleLoading(false);
    }
  }, [productID]);
  return (
    <Grid className="wrap-body" id="product">
      <BreadcrumbsComponents
        categoryName={product?.category?.categoryName}
        productName={product?.product?.productName}
      />
      <Grid container spacing={1}>
        <Grid item lg={6}>
          <ImageProductComponent listsImage={product?.product?.image} />
        </Grid>
        <Grid item lg={6}>
          <IntroduceComponent data={product} />
          <BoxPriceComponent data={product} handleLoading={props.handleLoading}/>
          <TabsComponents data={product} />
        </Grid>
      </Grid>
      <Grid>
        <RelatedProductComponent data={product} />
      </Grid>
    </Grid>
  );
};

export default DetailsProductScreens;
