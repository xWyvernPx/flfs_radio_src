import axiosClient from "./axiosClient";

class AccountAPI {
  async getMe() {
    const url = "/user/me";
    const response = await axiosClient.get(url);
    console.log(response);
    return response.data;
  }
  //   async logout() {
  //       const url = "/user/logout";
  //         const response = await axiosClient.get(url);

  //   }
}
export default new AccountAPI();
