const { Axios } = require("axios");
const qs = require("query-string");
const axiosClient = new Axios({
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
  transformResponse: (res) => {
    return JSON.parse(res);
  },
  paramsSerializer: (params) => qs.stringify({ ...params }),
});
axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.response.use((res) => {
  if (res && res.data) {
    return res.data;
  } else return res;
});
module.exports = axiosClient;
