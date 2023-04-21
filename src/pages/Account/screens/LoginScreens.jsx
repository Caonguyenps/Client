import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ButtonSubmitComponent from "../../../components/Button/ButtonSubmit.component";
import InputComponent from "../../../components/Input/Input.component";
import ModalSuccessComponent from "../../../components/Modal/ModalSuccess.component";
import HeaderAccountComponent from "../components/HeaderAccount.component";
import ModalErrorComponent from "../../../components/Modal/ModalError.component";
import validate from "../../../helper/validate";
import { useHistory } from "react-router-dom";
import path from "../../../resources/path";
import { login } from "../../../api/user.api";

const LoginScreens = (props) => {
  const [arrTitle, setArrTitle] = useState([
    { title: "email", name: "email", type: "email" },
    { title: "password", name: "password", type: "password" },
  ]);
  const [data, setData] = useState({ email: "", password: "" });
  const [msgError, setMsgError] = useState({ email: "", password: "" });
  const [openModal, setOpenModal] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    props.handleChangeLoading(false);
  }, []);

  const checkValidateInput = (name, value) => {
    let err;
    switch (name) {
      case "email":
        err = validate.validateEmail(value);
        break;
    }
    setMsgError((msgError) => ({
      ...msgError,
      [name]: err,
    }));
  };

  const handleChangeInput = (event) => {
    let { name, value } = event.target;
    checkValidateInput(name, value);
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const listsInput = arrTitle.map((e, index) => {
    return (
      <div className="wrap-input">
        <InputComponent data={e} handleChangeInput={handleChangeInput} />
        <div class="msg-error">
          <span>{msgError[e.name]}</span>
        </div>
      </div>
    );
  });

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    props.handleChangeLoading(true);
    await login(data)
      .then((res) => {
        props.handleChangeLoading(false);
        history.push("/");
      })
      .catch((error) => {
        props.handleChangeLoading(false);
        setOpenModalError(true);
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickForgotPassword = () => {
    history.push(path.FORGOT_PASSWORD);
  };

  const handleClickRegister = () => {
    history.push(path.REGISTER);
  };
  const handleCloseModalError = () => {
    setOpenModalError(false);
  };
  return (
    <div className="wrap-register">
      <div className="wrap-body">
        <div className="account-form">
          <HeaderAccountComponent title="Sign In" />
          <div className="wrap-form">
            <form onSubmit={handleSubmitForm}>
              {listsInput}
              <div className="bottom-form">
                <Grid container>
                  <Grid item lg={3}>
                    <div className="wrap-btn-form">
                      <span onClick={handleClickRegister}>Register</span>
                    </div>
                  </Grid>
                  <Grid item lg={6}>
                    <div className="wrap-btn">
                      <ButtonSubmitComponent
                        title="Sign In"
                        handleSubmitForm={handleSubmitForm}
                      />
                    </div>
                  </Grid>
                  <Grid item lg={3}>
                    <div className="wrap-btn-form item-right">
                      <span onClick={handleClickForgotPassword}>
                        Forgot password?
                      </span>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ModalSuccessComponent
        open={openModal}
        handleClose={handleCloseModal}
        title="Sign is successfully"
      />
      <ModalErrorComponent
        open={openModalError}
        handleClose={handleCloseModalError}
        title="Login failed, please try again"
      />
    </div>
  );
};

export default LoginScreens;
