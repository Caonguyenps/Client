import React, { useState, useEffect } from "react";
import "./header.css";
import Grid from "@material-ui/core/Grid";
import HeaderTopComponent from "./HeaderTop.component";
import HeaderMiddleComponent from "./HeaderMiddle.component";
import HeaderBottomComponent from "./HeaderBottom.component";
import { getCategoryProduct } from "../../api/product.api";
import { checkLogin } from "../../auth/auth";
const HeaderComponent = (props) => {
  const [listsCategory, setListsCategory] = useState([]);
  const [reload, setReload] = useState(false);
  const [login, setLogin] = useState(false);
  useEffect(async () => {
    await checkLogin()
      .then((res) => {
        setLogin(res);
      })
      .catch((error) => {
        setLogin(error);
      });
  }, []);
  // const login = checkLogin();
  // debugger;
  // console.log(checkLogin());

  const hanldeReload = () => {
    setReload(!reload);
  };

  useEffect(async () => {
    await getCategoryProduct().then((res) => {
      setListsCategory(res.data);
    });
  }, []);

  useEffect(() => {
    setTimeout(props.handleChangeLoading(false), 1000);
  }, [reload]);

  return (
    <Grid id="header" className="wrap-body">
      <HeaderTopComponent />
      <HeaderMiddleComponent
        listsCategory={listsCategory}
        login={login}
        hanldeReload={hanldeReload}
        handleChangeLoading={props.handleChangeLoading}
      />
      <HeaderBottomComponent listsCategory={listsCategory} />
    </Grid>
  );
};

export default HeaderComponent;
