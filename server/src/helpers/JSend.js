const JSend = {
  success: (data, message) => {
    return {
      status: "SUCCESS",
      data: data,
      message: message ? message : "Success",
    };
  },
  fail: (data, message) => {
    return {
      status: "FAIL",
      data: data,
      message: message ? message : "Fail",
    };
  },
  error: (data, message, code) => {
    return {
      status: "ERROR",
      data: data,
      message: message ? message : "Error",
      code,
    };
  },
};
module.exports = JSend;
