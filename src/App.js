import MainLayout from "./layouts/MainLayout";
import "./assets/css/style.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AccountRoutes from "./routes/AccountRoutes";
import path from "./resources/path";
import { getTokenFirebase, onMessageListener } from "./firebase";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  getTokenFirebase()
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  onMessageListener()
    .then((res) => {
      console.log(res);
      toast.success(`${res.notification.title} + ${res.notification.body}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <Switch>
        <Route path={path.ACCOUNT} render={() => <AccountRoutes />} />
        <Route path={path.HOME} render={() => <MainLayout />} />
      </Switch>
    </BrowserRouter>
  );
}
