import api from "../config/api";

export const getBannerHome = () => {
  return new Promise(async (resolve, reject) => {
    await api
      .get("/api/v1/banner")
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};
