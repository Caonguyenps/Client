import api from "../config/api";

export const getCustomerSaid = () => {
  return new Promise(async (resolve, reject) => {
    await api
      .get("/api/v1/customer/talk")
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};
