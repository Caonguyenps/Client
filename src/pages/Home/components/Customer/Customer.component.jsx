import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getCustomerSaid } from "../../../../api/customer.api";
import Slider from "react-slick";
import { Grid } from "@material-ui/core";
import "./customer.css";
const CustomerComponent = () => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className="btn-next" style={{ ...style }} onClick={onClick}>
        <i className="fa-solid fa-chevron-left"></i>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className="btn-pre" style={{ ...style }} onClick={onClick}>
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    );
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 1500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const [customer, setCustomer] = useState([]);
  useEffect(async () => {
    await getCustomerSaid().then((res) => {
      setCustomer(res.data);
    });
  }, []);
  const showListsCustomer = customer.map((e, index) => {
    return (
      <div className="wrap-customer">
        <div className="customer-content">
          <div className="content-text">
            <span>{e.content}</span>
          </div>
          <div className="name-customer mt-3">
            <span>{e.customerName}</span>
          </div>
        </div>
      </div>
    );
  });
  return (
    <Grid className="wrap-body customer">
      <Grid className="header-customer">
        <span>Our customers says</span>
      </Grid>
      <Slider {...settings}>{showListsCustomer}</Slider>
    </Grid>
  );
};

export default CustomerComponent;
