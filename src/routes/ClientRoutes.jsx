import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeScreens from "../pages/Home/screens/HomeScreens";
import path from "../resources/path";
import LoadingComponent from "../components/Loading/Loading.component";
import RegisterScreens from "../pages/Account/screens/RegisterScreens";
import OtpScreens from "../pages/Account/screens/OtpScreens";
import LoginScreens from "../pages/Account/screens/LoginScreens";
import ForgotPasswordScreens from "../pages/Account/screens/ForgotPasswordScreens";
import UpdateForgotPassword from "../pages/Account/screens/UpdateForgotPasswordScreens";
import HeaderComponent from "../components/Header/Header.component";
import FooterComponent from "../components/Footer/Footer.component";
import ProductScreens from "../pages/Product/screens/ProductScreens";
import DetailsProductScreens from "../pages/DetailsProduct/screens/DetailsProductScreens";
import { checkLogin } from "../auth/auth";
import ModalCheckLoginComponent from "../components/Modal/ModalCheckLogin.component";
import { useHistory } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import CheckoutScreens from "../pages/Checkout/screens/CheckoutScreens";
import { useEffect } from "react";
import CardScreens from "../pages/Card/CardScreens";
import AboutUs from "../pages/AboutUs/AboutUs";
import SearchScreens from "../pages/Search/SearchScreens";

const ClientRoutes = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [login, setLogin] = useState(false);
  useEffect(async () => {
    setLogin(await checkLogin());
  }, []);

  const handleLoading = (status) => {
    setLoading(status);
  };

  const handleClick = (path) => {
    setOpenModal(false);
    history.push(path);
  };

  return (
    <>
      {loading ? <LoadingComponent /> : <></>}
      <Route
        exact
        path={path.HOME}
        render={(props) => <HomeScreens {...props} />}
      />
      <Route
        exact
        path={path.PRODUCT}
        render={(props) => <ProductScreens {...props} />}
      />

      <Route
        exact
        path={path.ABOUT}
        render={(props) => (
          <AboutUs {...props} handleLoading={handleLoading} />
        )}
      />

      <Route
        exact
        path={path.DETAIL_PRODUCT}
        render={(props) => (
          <DetailsProductScreens {...props} handleLoading={handleLoading} />
        )}
      />

      <Route
        exact
        path={path.SEARCH}
        render={(props) => (
          <SearchScreens {...props} handleLoading={handleLoading} />
        )}
      />

      {login ? (
        <>
          <Route
            path={path.USER}
            render={(props) => (
              <UserLayout {...props} handleLoading={handleLoading} />
            )}
          />

          <Route
            path={path.CHECKOUT}
            render={(props) => (
              <CheckoutScreens {...props} handleLoading={handleLoading} />
            )}
          />

          <Route
            path={path.CARD}
            render={(props) => (
              <CardScreens {...props} handleLoading={handleLoading} />
            )}
          />
        </>
      ) : (
        <></>
        // <ModalCheckLoginComponent open={openModal} handleClick={handleClick} />
      )}
    </>
  );
};

export default ClientRoutes;
