import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import "./headerAccount.css";
const HeaderAccountComponent = (props) => {
  return (
    <div className="wrap-header-account">
      <div className="title-account">
        <span>{props.title}</span>
      </div>
      <div className="wrap-icon-account">
        <div className="icon-account">
          <PersonIcon className="icon" />
        </div>
      </div>
    </div>
  );
};

export default HeaderAccountComponent;
