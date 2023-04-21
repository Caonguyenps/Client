import { Grid } from "@material-ui/core";
import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LockIcon from "@material-ui/icons/Lock";
import "./sidebar.css";
import path from "../../resources/path";
import { useHistory } from "react-router-dom";
import { useState } from "react";
const SidebarComponent = () => {
  const history = useHistory();
  const [active, setActive] = useState(1);
  const arrSidebar = [
    {
      name: "Account Information",
      icon: <AccountCircleIcon />,
      color: "#19B2B8",
      path: path.USER_INFOR,
      key: 1,
    },
    {
      name: "Delivery address",
      icon: <LocalShippingIcon />,
      color: "#53A600",
      path: path.DELIVERY,
      key: 2,
    },
    {
      name: "Wishlist",
      icon: <FavoriteBorderIcon />,
      path: path.WISH_LISTS,
      key: 3,
      color: "#FF3F3F",
    },
    {
      name: "Your order",
      icon: <ShoppingCartIcon />,
      path: path.ORDER,
      color: "#FF6B00",
      key: 4,
    },
    {
      name: "Change password",
      path: path.CHANGE_PASSWORD,
      icon: <LockIcon />,
      color: "#000000",
      key: 5,
    },
  ];

  const showListsItem = arrSidebar.map((e, index) => {
    return (
      <Grid
        style={{ color: e.color }}
        className={"sidebar-item " + (e.key == active ? "item-active" : "")}
        onClick={() => {
          handleClick(e.path, e.key);
        }}
      >
        {e.icon} <span className="ml-2">{e.name}</span>
      </Grid>
    );
  });

  const handleClick = (path, key) => {
    setActive(key);
    history.push(path);
  };
  return <Grid className="wrap-sidebar">{showListsItem}</Grid>;
};

export default SidebarComponent;
