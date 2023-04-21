import axios from "axios";
import api from "../config/api";
import { getAccessToken, getUserID, saveToken } from "../helper/token";

export const refreshToken = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post("api/v1/token/refresh-token", data)
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const register = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post("/api/v1/user/register", data)
      .then((result) => {
        return resolve(result);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const confirmOtpRegister = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post("/api/v1/user/verify-otp-register", data)
      .then((result) => {
        return resolve(result);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const resendOTP = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post("/api/v1/user/resend-otp", data)
      .then((result) => {
        return resolve(result);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const forgotPassword = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post("/api/v1/user/forgot-password", data)
      .then((result) => {
        return resolve(result);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const updatePasswordForgot = (data, token) => {
  return new Promise(async (resolve, reject) => {
    await api
      .patch("/api/v1/user/new-password", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        return resolve(result);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const login = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post("/api/v1/user/login", data)
      .then((result) => {
        return resolve(
          saveToken(result.data.accessToken, result.data.refreshToken)
        );
        // return resolve(result);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getUserInfor = () => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/user/profile/${getUserID()}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const updateAvatar = (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  return new Promise(async (resolve, reject) => {
    await api
      .patch(`/api/v1/user/avatar/${getUserID()}`, formData, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const updateProfile = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .patch(`/api/v1/user/profile/${getUserID()}`, data, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const addWishList = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post(`/api/v1/favourite/add`, data, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const removeWishList = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post(`/api/v1/favourite/delete`, data, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getWishLists = () => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/favourite/lists/${getUserID()}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getDetailsWishList = () => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/favourite/details/${getUserID()}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getDeliveryAddress = () => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/user/lists-delivery-address/${getUserID()}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const addDeliveryAddress = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post(`/api/v1/user/delivery-address`, data, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};
export const getLocation = () => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(`https://provinces.open-api.vn/api/?depth=3`, {})
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const changePassword = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .patch(`/api/v1/user/password/${getUserID()}`, data, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const deleteAddress = (id) => {
  return new Promise(async (resolve, reject) => {
    await api
      .delete(`/api/v1/user/delivery-address/${id}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const deleteOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    await api
      .delete(`/api/v1/user/order/${id}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const addOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post(`/api/v1/cart/order/add/${getUserID()}`, data, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getOrderUser = () => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/cart/order/list/${getUserID()}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};
