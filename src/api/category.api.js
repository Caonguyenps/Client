import api from "../config/api";

export const getDetailsCategory = (categoryID) => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/category/details-category/${categoryID}`)
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getBranchCategory = (categoryID) => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/branch/${categoryID}`)
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};
