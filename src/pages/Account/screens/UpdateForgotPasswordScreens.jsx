import React, { useState } from "react";
import ButtonSubmitComponent from "../../../components/Button/ButtonSubmit.component";
import InputComponent from "../../../components/Input/Input.component";
import ModalErrorComponent from "../../../components/Modal/ModalError.component";
import ModalSuccessComponent from "../../../components/Modal/ModalSuccess.component";
import validate from "../../../helper/validate";
import HeaderAccountComponent from "../components/HeaderAccount.component";
import queryString from "query-string";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import path from "../../../resources/path";
import { checkTimeToken } from "../../../auth/auth";
import { updatePasswordForgot } from "../../../api/user.api";

const UpdateForgotPassword = (props) => {
  const history = useHistory();
  const query = queryString.parse(props.location.search);
  const token = query.q;
  const [openModal, setOpenModal] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [title, setTitle] = useState("");
  const [listsInput, setListInput] = useState([
    {
      title: "New password",
      name: "newPassword",
      type: "password",
    },
    {
      title: "Confirm password",
      name: "confirmPassword",
      type: "password",
    },
  ]);
  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [msgError, setMsgError] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const checkValidateInput = (name, value) => {
    let err;
    switch (name) {
      case "confirmPassword":
        err = validate.validateConfirmPassword(value, data.newPassword);
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

  useEffect(() => {
    if (token) {
      if (!checkTimeToken(token)) {
        setTitle("Your link has expired, please try again later");
        setOpenModalError(true);
      }
    } else {
      history.push(path.HOME);
    }
  }, [token]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const dataPassword = {
      newPassword: data.newPassword,
    };
    props.handleChangeLoading(true);
    await updatePasswordForgot(dataPassword, token)
      .then((res) => {
        props.handleChangeLoading(false);
        setOpenModal(true);
      })
      .catch((error) => {
        props.handleChangeLoading(false);
        setTitle("Password change failed");
        setOpenModalError(true);
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseModalError = () => {
    setOpenModalError(false);
    history.push(path.HOME);
  };

  const showListsInput = listsInput.map((e, index) => {
    return (
      <div className="wrap-input">
        <InputComponent data={e} handleChangeInput={handleChangeInput} />
        <div className="wrap-title-content">
          <span class="msg-error">{msgError[e.name]}</span>
        </div>
      </div>
    );
  });

  return (
    <div className="wrap-register">
      <div className="wrap-body">
        <div className="account-form">
          <HeaderAccountComponent title="Forgot Password" />
          <div className="wrap-form">
            <form onSubmit={handleSubmitForm}>
              {showListsInput}
              <div className="  wrap-btn">
                <ButtonSubmitComponent
                  title="Accept"
                  handleSubmitForm={handleSubmitForm}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ModalSuccessComponent
        open={openModal}
        handleClose={handleCloseModal}
        title="Change password successfully"
      />
      <ModalErrorComponent
        open={openModalError}
        title={title}
        handleClose={handleCloseModalError}
      />
    </div>
  );
};

export default UpdateForgotPassword;
