import {
  CHECK_AUTH,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  GET,
  POST,
} from "../utils/APIConstants";

import { APIManager } from "../api/APIManager";
import User from "../model/User";

export class AuthService {

  static async checkAuth(): Promise<number> {
    const res = await APIManager.request(CHECK_AUTH, GET, null, true, true);
    sessionStorage.setItem("name", res.name);
    return res.userId;
  }

  static async registerUser(user: User): Promise<void> {
    const res = await APIManager.request(REGISTER_USER, POST, JSON.stringify(user), false, true);
    localStorage.setItem("sessionToken", res.sessionToken);
    let sessionStorage = window.sessionStorage;
    sessionStorage.setItem("name", res.name);
  }

  static async loginUser(user: User): Promise<void> {
    // APIManager.request(LOGIN_USER, POST, JSON.stringify(user), false, true).then((res) => {
    //   const resp = res;
    //   localStorage.setItem("sessionToken", resp.sessionToken);
    //   let sessionStorage = window.sessionStorage;
    //   sessionStorage.setItem("name", resp.name);
    //   sessionStorage.setItem("userId", resp.id);
    // });
    const res = await APIManager.request(LOGIN_USER, POST, JSON.stringify(user), false, true);
    let sessionStorage = window.sessionStorage;
    sessionStorage.setItem("name", res.name);
    sessionStorage.setItem("userId", res.id);
    localStorage.setItem("sessionToken", res.sessionToken);
  }

  static async logoutUser(): Promise<void> {
    await APIManager.request(LOGOUT_USER, GET, null, true, false, false)
    localStorage.removeItem("sessionToken");
    let sessionStorage = window.sessionStorage;
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("userId");
  }
}