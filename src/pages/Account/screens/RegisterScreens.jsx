import React, { useState } from "react";
import InputComponent from "../../../components/Input/Input.component";
import "./account.css";
import ButtonSubmitComponent from "../../../components/Button/ButtonSubmit.component";
import validate from "../../../helper/validate";
import { register } from "../../../api/user.api";
import ModalErrorComponent from "../../../components/Modal/ModalError.component";
import { useHistory } from "react-router-dom";
import path from "../../../resources/path";
import HeaderAccountComponent from "../components/HeaderAccount.component";
import { Grid } from "@material-ui/core";

const RegisterScreens = (props) => {
  const history = useHistory();
  const [arrTitle, setArrTitle] = useState([
    { title: "Email", name: "email", type: "email" },
    { title: "Full Name", name: "fullName", type: "text" },
    { title: "Phone Number", name: "phoneNumber", type: "number" },
    { title: "Address", name: "address", type: "text" },
    { title: "Password", name: "password", type: "password" },
    { title: "Confirm Password", name: "confirmPassword", type: "password" },
  ]);
  const [data, setData] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    password: "",
    address: "",
  });
  const [msgError, setMsgError] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [openModal, setOpenModal] = useState(false);

  const handleChangeInput = (event) => {
    let { name, value } = event.target;
    checkValidateInput(name, value);
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const checkValidateInput = (name, value) => {
    let err;
    switch (name) {
      case "phoneNumber":
        err = validate.validatePhoneNumber(value);
        break;
      case "email":
        err = validate.validateEmail(value);
        break;
      case "fullName":
        err = validate.validateString(name, value);
        break;
      case "address":
        err = validate.validateString(name, value);
        break;
      case "confirmPassword":
        err = validate.validateConfirmPassword(value, data.password);
        break;
    }
    setMsgError((msgError) => ({
      ...msgError,
      [name]: err,
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
    await register(data)
      .then((res) => {
        history.push({
          pathname: path.OTP,
          search: `?email=${data.email}`,
        });
      })
      .catch((error) => {
        props.handleChangeLoading(false);
        setOpenModal(true);
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
          <HeaderAccountComponent title="Register" />
          <div className="wrap-form">
            <form onSubmit={handleSubmitForm}>
              {listsInput}
              <Grid container>
                <Grid item lg={3}>
                  <div className="wrap-btn-form item-right">
                    <span onClick={handleClickHome}>Home page</span>
                  </div>
                </Grid>
                <Grid item lg={6}>
                  <div className="wrap-btn">
                    <ButtonSubmitComponent
                      title="Register"
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
            </form>
          </div>
        </div>
      </div>
      <ModalErrorComponent
        open={openModal}
        handleClose={handleCloseModal}
        title="Registration failed, please try again!"
      />
    </div>
  );
};

export default RegisterScreens;
