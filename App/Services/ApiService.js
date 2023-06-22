import axios from "axios";
import * as AxiosLogger from "axios-logger";

/* Esta es una forma de establecer la URL base para la API. */
const isProd = true;
const IP = "192.168.0.35";
export const ORIGIN_API = isProd
  ? "https://quick-app-backend.herokuapp.com"
  : `http://${IP}:1337`;
const BASE_URL = `${ORIGIN_API}/api`;

console.log("====================================");
console.log({ BASE_URL });
console.log("====================================");

class ApiService {
  constructor() {
    const api = axios.create({});
    this.api = api;
    this.api.defaults.baseURL = BASE_URL;
    /* if (__DEV__) {
            this.api.interceptors.request.use(AxiosLogger.requestLogger);
            this.api.interceptors.response.use(AxiosLogger.responseLogger);
        } */
  }

  setAuthorizationHeader(authorizationToken) {
    console.log("auth", authorizationToken);
    this.api.defaults.headers.common["Authorization"] =
      "Bearer " + authorizationToken;
  }

  cleanAuthorizationHeader() {
    delete this.api.defaults.headers.common["Authorization"];
  }

  async register({ email, password, name, country, sharingCode, username, fcmToken }) {
    const response = await this.api.post("auth/local/register", {
      email,
      username: email,
      country,
      sharingCode,
      password,
      name,
      username,
      fcmToken
    });
    return response;
  }

  async login({ email, password, fcmToken }) {
    try {
      const response = await this.api.post("auth/local", {
        identifier: email,
        password,
        fcmToken
      });
      return response;
    } catch (error) {
      console.log("ERROR: ", { error });
      return error.response;
    }
  }

  async signOut(user) {
    try {
      const response = await this.api.post("auth/signOut", user);
      return response;
    } catch (error) {
      console.log("ERROR: ", { error });
      return error.response;
    }
  }

  async forgotPassword(email) {
    const response = await this.api.post("auth/forgot-password", {
      email,
      url: "https://appquickmoney.com/reset-password",
    });
    return response;
  }

  async getUser() {
    const response = await this.api.get("users/me");
    return response;
  }

  async updateUser(userId, data) {
    const response = await this.api.put("users/" + userId, data);
    return response;
  }

  async deleteUser(userId) {
    return await this.api.delete("users/" + userId);
  }

  async getLegal() {
    try {
      const response = await this.api.get("legal");
      return response;
    } catch (error) {
      console.log("ERROR: ", { error });
      return error.response;
    }
  }

  async postAdVisualization() {
    console.log("🚀 ~ file: ApiService.js:96 ~ ApiService ~ postAdVisualization ~ postAdVisualization:")
    const response = await this.api.post("ads-visualizations", {
      hashID: "" + new Date().getTime(),
    });
    return response;
  }

  async linkChain(sharingCode) {
    const response = await this.api.post("link-chain", { sharingCode });
    return response;
  }

  async getTotalUserPlayed() {
    const response = await this.api.get("play/users/total");
    return response;
  }

  async getTotalEarnedPrices() {
    const response = await this.api.get("prize/total");
    return response;
  }
  async getTotalChainEarnedPrices() {
    const response = await this.api.get("chain-prize/total");
    return response;
  }

  async getAvaliablePrizes() {
    const response = await this.api.get("/awards/current");
    return response;
  }

  async getGameConfig() {
    const response = await this.api.get("/awards/current");
    return response;
  }

  async playGame(bet) {
    console.log("🚀 ~ file: ApiService.js:133 ~ ApiService ~ playGame ~ playGame:")
    const response = await this.api.post("plays", { bet });
    return response;
  }

  async getTopPlayers() {
    const response = await this.api.get("prize/top_players?populate[0]=user");
    return response;
  }

  async getTopChains() {
    const response = await this.api.get("chain-prize/top_chains");
    return response;
  }

  async getMyPrices() {
    const response = await this.api.get("prize/my_prizes");
    return response;
  }

  async requestMoney(amount) {
    const response = await this.api.post("prize/request_money", { amount });
    return response;
  }

  async simulateChain(chain) {
    const response = await this.api.post("chain-simulator", { chain });
    return response;
  }

  async getFaqs() {
    const response = await this.api.get("faqs");
    return response;
  }

  async getAvaliablePrizes() {
    const response = await this.api.get("/awards/current");
    return response;
  }

  async getGameConfig() {
    const response = await this.api.get("/awards/current");
    return response;
  }

  async playGame(bet) {
    console.log("🚀 ~ file: ApiService.js:133 ~ ApiService ~ playGame ~ playGame:")
    const response = await this.api.post("plays", { bet });
    return response;
  }

  async getTopPlayers() {
    const response = await this.api.get("prize/top_players?populate[0]=user");
    return response;
  }

  async getTopChains() {
    const response = await this.api.get("chain-prize/top_chains");
    return response;
  }

  async getMyPrices() {
    const response = await this.api.get("prize/my_prizes");
    return response;
  }

  async requestMoney(amount) {
    const response = await this.api.post("prize/request_money", { amount });
    return response;
  }

  async getFaqs() {
    const response = await this.api.get("faqs");
    return response;
  }

  async getGameParameters() {
    const response = await this.api.get("parameter");
    return response;
  }

  async getTotalOnlineUsers() {
    const response = await this.api.get("online-user/total");
    return response;
  }

  async getCanTestYourLuckInfo() {
    const response = await this.api.get("users/can-test-my-luck-info");
    return response;
  }

  async getChainPrizesByUser(id) {
    const response = await this.api.get(
      `chain-prizes?filters[user][id][$eq]=${id}`
    );
    return response;
  }

  async getPrizeSummary() {
    const response = await this.api.get("users/prize-summary");
    return response;
  }

  async paypalWithdrawal(password, amount, email) {
    const response = await this.api.post("withdrawal", {
      password,
      amount,
      email,
    });
    return response;
  }

  async getAllTopChains(page) {
    const response = await this.api.get(
      `/chain-prize/all-top-chains?page=${page}&pageSize=10`
    );
    return response;
  }

  async getAllTopPlayers(page) {
    const response = await this.api.get(
      `/prize/top-all-players?page=${page}&pageSize=10`
    );
    return response;
  }

  async sendDataUserPp(data) {
    const response = await this.api.post("prize/request_money/paypal", data);
    return response;
  }
}

export default new ApiService();
