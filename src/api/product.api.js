import api from "../config/api";
import { getAccessToken, getUserID } from "../helper/token";

export const getCategoryProduct = () => {
  return new Promise(async (resolve, reject) => {
    await api
      .get("/api/v1/category/product")
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getProductHomeType = (type) => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/product/home/${type}`)
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getDailyProductHome = () => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/daily/home`)
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getListsProductPagi = (categoryID, page) => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/product/category/${categoryID}/${page - 1}`)
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getListsProductFiler = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post(`/api/v1/product/filter`, data)
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/product/details/${id}`)
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getRelatedProduct = (categoryID, subCategoryID, branchID) => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/product/related/${categoryID}/${subCategoryID}/${branchID}`)
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};


export const addToCart = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post(`/api/v1/cart/add/${getUserID()}`, data, {
        headers: {
          Authorization: getAccessToken(),
        }
      }
      )
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};


export const getListCart = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/cart/list/${getUserID()}`, {
        headers: {
          Authorization: getAccessToken(),
        }
      }
      )
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};


export const deleteCart = (id) => {
  return new Promise(async (resolve, reject) => {
    await api
      .delete(`/api/v1/cart/delete/${id}`, {
        headers: {
          Authorization: getAccessToken(),
        }
      }
      )
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};


export const searchProduct = (category, search) => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/product/search/${category}/${search}`
      )
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};
