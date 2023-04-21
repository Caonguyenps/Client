import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import "./cart.css";
import { deleteCart, getListCart } from "../../api/product.api";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import ModalAddress from "../../components/Modal/ModalAddress";
import PayPalButton from "../Checkout/components/PayPalButton";
import { getUserID } from "../../helper/token";
import { addOrder } from "../../api/user.api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import path from "../../resources/path";

const CardScreens = (props) => {
  const history = useHistory();
  const [arrCart, setArrCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [listProduct, setListProduct] = useState([]);

  useEffect(async () => {
    props.handleLoading(true);
    await getListCart().then((res) => {
      setArrCart(res.data);
      console.log(res.data);
      let sum = 0;
      const arr = [];
      for (let item of res.data) {
        console.log(item);
        sum = sum + item.product.price * item.cart.quantity;
        arr.push({
          productID: item.product._id,
          price: item.product.price,
          quantity: item.cart.quantity,
        });
      }
      setListProduct(arr);
      setTotal(sum);
    });
    props.handleLoading(false);
  }, [reload]);

  const showList = arrCart.map((e, index) => {
    console.log(e);
    return (
      <>
        <div className="cartItem row align-items-start" key={index}>
          <div className="col-3 mb-2">
            <img
              className="w-100"
              src={e?.product?.image[0]?.url}
              alt="art image"
            />
          </div>
          <div className="col-3 mb-2">
            <h6 className>{e?.product?.productName}</h6>
          </div>
          <div className="col-2">
            <p className="cartItemQuantity p-1 text-center">
              {e?.cart?.quantity}
            </p>
          </div>
          <div className="col-2">
            <p id="cartItem1Price">${e?.product?.price * e?.cart?.quantity}</p>
          </div>
          <div className="col-2">
            <IconButton
              aria-label="delete"
              style={{ color: "red" }}
              onClick={() => {
                handleClickDelete(e?.cart?._id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <hr />
      </>
    );
  });

  const handleClickDelete = async (id) => {
    await deleteCart(id)
      .then(() => {
        setReload(!reload);
      })
      .catch((error) => {
        history.push("/home");
      });
  };

  const handleClickCheckOut = () => {
    setOpen(true);
  };

  const handleCloseModal = (status) => {
    setOpen(false);
    setStatus(status);
  };

  const handleSuccessPayment = async (paypal) => {
    let paypalID = paypal.id;
    const infor = JSON.parse(localStorage.getItem("address"));
    const data = {
      ownerID: getUserID(),
      fullName: infor.fullName,
      address: infor.address,
      phoneNumber: infor.phoneNumber,
      totalPrice: total,
      paypalID: paypalID,
      listsProduct: listProduct,
    };
    props.handleLoading(true);
    await addOrder(data).then((res) => {
      toast.success("Payment successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push(path.ORDER);
    });
  };
  return (
    <Grid className="wrap-content-right">
      <Grid id="cart">
        <div>
          <h1>Your Cart</h1>
          <div className="container-fluid">
            <div className="row align-items-start">
              <div className="col-12 col-sm-8 items">
                {/*1*/}
                {showList}
              </div>
              <div className="col-12 col-sm-4 p-3 proceed form">
                <div className="row mx-0 mb-2">
                  <div className="col-sm-8 p-0 d-inline">
                    <h5>Total</h5>
                  </div>
                  <div className="col-sm-4 p-0">
                    <p id="total">${total}</p>
                  </div>
                </div>

                {status ? (
                  <PayPalButton
                    total={total}
                    handleSuccessPayment={handleSuccessPayment}
                  />
                ) : (
                  <a
                    onClick={() => {
                      handleClickCheckOut();
                    }}
                  >
                    <button id="btn-checkout" className="shopnow">
                      <span>Checkout</span>
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Grid>
      <ModalAddress open={open} handleCloseModal={handleCloseModal} />
      <ToastContainer />
    </Grid>
  );
};

export default CardScreens;
