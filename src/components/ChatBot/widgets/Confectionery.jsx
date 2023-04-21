import React from "react";
import image from "../../../assets/image/h2.png";

import "../style.css";
const Confectionery = () => {
  return (
    <div className="image">
      <div className="title">DOUBLE MUSHROOM SWISS cake</div>
      <a
        href="http://localhost:3000/details-product/642fc94d48a34a6a4c282974"
        className="tel-link"
      >
        <img src={image} width="100%" height="100%" />
      </a>
    </div>
  );
};

export default Confectionery;
