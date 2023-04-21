import React from "react";
import image from "../../../assets/image/Toto.png";
import "../style.css";
const AddressContact = () => {
  return (
    <div className="address">
      <div className="location">
        <span>Address: Can Tho</span>
      </div>
      <div className="phone">
        <span>Hotline: 0981424285</span>
      </div>
      <div className="gmail">
        <span>Gmail: phamcaonguyen03032000@gmail.com</span>
      </div>

      <img src={image} width="100%" height="100%" />
    </div>
  );
};

export default AddressContact;
