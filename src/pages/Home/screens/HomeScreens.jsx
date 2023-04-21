import { Grid } from "@material-ui/core";
import { useEffect, useState, useRef } from "react";
import SliderBannerComponent from "../../../components/Slider/SliderBanner.component";
import BestSellingComponent from "../components/BestSelling/BestSelling.component";
import CustomerComponent from "../components/Customer/Customer.component";
import WrapProductComponent from "../components/WrapProduct/WrapProduct.component";
export default function HomeScreens(props) {
  return (
    <Grid>
      <Grid className="mt-5">
        <SliderBannerComponent />
        <WrapProductComponent />
        <BestSellingComponent type={0} />
        <CustomerComponent />
      </Grid>
    </Grid>
  );
}
