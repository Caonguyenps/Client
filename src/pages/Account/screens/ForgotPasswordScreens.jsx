import React, { useState } from "react";
import { forgotPassword } from "../../../api/user.api";
import ButtonSubmitComponent from "../../../components/Button/ButtonSubmit.component";
import InputComponent from "../../../components/Input/Input.component";
import ModalErrorComponent from "../../../components/Modal/ModalError.component";
import ModalSuccessComponent from "../../../components/Modal/ModalSuccess.component";
import validate from "../../../helper/validate";
import HeaderAccountComponent from "../components/HeaderAccount.component";
import path from "../../../resources/path";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const ForgotPasswordScreens = (props) => {
  const history = useHistory();
  const [data, setData] = useState({
    title: "Registered Email",
    name: "email",
    type: "email",
  });
  const [email, setEmail] = useState();
  const [msgError, setMsgError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);

  const handleChangeInput = (event) => {
    setEmail(event.target.value);
    setMsgError(validate.validateEmail(event.target.value));
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (msgError == "") {
      props.handleChangeLoading(true);
      const data = {
        email: email,
      };
      await forgotPassword(data)
        .then((res) => {
          props.handleChangeLoading(false);
          setOpenModal(true);
        })
        .catch((error) => {
          props.handleChangeLoading(false);
          if (error.status == 409 || error == 500) {
            setOpenModalError(true);
          }
        });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseModalError = () => {
    setOpenModalError(false);
  };

  const handleClickHome = () => {
    history.push(path.HOME);
  };

  const handleClickLogin = () => {
    history.push(path.LOGIN);
  };

  return (
    <div className="wrap-register">
      <div className="wrap-body">
        <div className="account-form">
          <HeaderAccountComponent title="Forgot Password" />
          <div className="wrap-form">
            <form onSubmit={handleSubmitForm}>
              <div className="wrap-input">
                <InputComponent
                  data={data}
                  handleChangeInput={handleChangeInput}
                />
                <div class="msg-error">
                  <span>{msgError}</span>
                </div>
              </div>
            </form>
            <Grid container>
              <Grid item lg={3}>
                <div className="wrap-btn-form item-right">
                  <span onClick={handleClickHome}>Home Page</span>
                </div>
              </Grid>
              <Grid item lg={6}>
                <div className="wrap-btn">
                  <ButtonSubmitComponent
                    title="Accept"
                    handleSubmitForm={handleSubmitForm}
                  />
                </div>
              </Grid>

              <Grid item lg={3}>
                <div className="wrap-btn-form item-lef">
                  <span onClick={handleClickLogin}>Login</span>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <ModalSuccessComponent
        open={openModal}
        handleClose={handleCloseModal}
        title="The system has sent a confirmation email, please check your email"
      />
      <ModalErrorComponent
        open={openModalError}
        title="Email is not registered by any account"
        handleClose={handleCloseModalError}
      />
    </div>
  );
};

export default ForgotPasswordScreens;
