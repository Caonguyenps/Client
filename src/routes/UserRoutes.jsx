import React from "react";
import { useState } from "react";
import { Route } from "react-router-dom";
import LoadingComponent from "../components/Loading/Loading.component";
import AddDeliveryAddressScreens from "../pages/Delivery/screens/AddDeliveryAddressScreens";
import DeliveryAdressScreens from "../pages/Delivery/screens/DeliveryAdressScreens";
import UserInforScreens from "../pages/UserInfor/screens/UserInforScreens";
import path, { ORDER } from "../resources/path";
import Wishlist from "../pages/Wishlist/Wishlist";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import Order from "../pages/Order/Order";

const UserRoutes = (props) => {
  const [loading, setLoading] = useState(false);
  const handleLoading = (status) => {
    setLoading(status);
  };
  return (
    <>
      {loading ? <LoadingComponent /> : <></>}
      <Route
        exact
        path={path.USER_INFOR}
        render={() => (
          <UserInforScreens
            handleLoading={handleLoading}
            profile={props.profile}
          />
        )}
      />

      <Route
        exact
        path={path.DELIVERY}
        render={(props) => (
          <DeliveryAdressScreens {...props} handleLoading={handleLoading} />
        )}
      />

      <Route
        exact
        path={path.ADD_DELIVERY}
        render={(props) => (
          <AddDeliveryAddressScreens {...props} handleLoading={handleLoading} />
        )}
      />

      <Route
        exact
        path={path.WISH_LISTS}
        render={(props) => (
          <Wishlist {...props} handleLoading={handleLoading} />
        )}
      />

      <Route
        exact
        path={path.CHANGE_PASSWORD}
        render={(props) => (
          <ChangePassword {...props} handleLoading={handleLoading} />
        )}
      />

      <Route
        exact
        path={path.ORDER}
        render={(props) => (
          <Order {...props} handleLoading={handleLoading} />
        )}
      />
    </>
  );
};

export default UserRoutes;
