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

const AccountRoutes = () => {
  const [loading, setLoading] = useState(false);
  const handleChangeLoading = (status) => {
    setLoading(status);
  };
  return (
    <>
      {loading ? <LoadingComponent /> : ""}

      <Route
        exact
        path={path.REGISTER}
        render={() => (
          <RegisterScreens handleChangeLoading={handleChangeLoading} />
        )}
      />

      <Route
        exact
        path={path.OTP}
        render={(props) => (
          <OtpScreens handleChangeLoading={handleChangeLoading} {...props} />
        )}
      />
      <Route
        exact
        path={path.LOGIN}
        render={() => (
          <LoginScreens handleChangeLoading={handleChangeLoading} />
        )}
      />

      <Route
        exact
        path={path.FORGOT_PASSWORD}
        render={() => (
          <ForgotPasswordScreens handleChangeLoading={handleChangeLoading} />
        )}
      />

      <Route
        exact
        path={path.UPDATE_FORGOT_PASSWORD}
        render={(props) => (
          <UpdateForgotPassword
            handleChangeLoading={handleChangeLoading}
            {...props}
          />
        )}
      />
    </>
  );
};

export default AccountRoutes;
