import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import { getBannerHome } from "../../api/banner.api";
import BannerComponent from "../Banner/Banner.component";
const SliderBannerComponent = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  const [listsBanner, setListsBanner] = useState([]);

  useEffect(async () => {
    await getBannerHome().then((res) => {
      setListsBanner(res.data);
    });
  }, []);

  const showListsBanner = listsBanner.map((e, index) => {
    return (
      <div key={index}>
        <BannerComponent data={e} />
      </div>
    );
  });

  return (
    <Slider {...settings} className="wrap-body">
      {showListsBanner}
    </Slider>
  );
};

export default SliderBannerComponent;
