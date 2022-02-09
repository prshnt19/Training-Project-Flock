"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIManager = void 0;
class APIManager {
    static request(url, method, body, isPostAuth = false, isJSON = false, haveResponse = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = new Headers();
            if (isPostAuth) {
                const sessionToken = localStorage.getItem("sessionToken");
                if (sessionToken)
                    headers.append("sessionToken", sessionToken);
            }
            if (isJSON) {
                headers.append("Content-Type", "application/json");
            }
            return yield fetch(url, {
                method: method,
                headers: headers,
                body: body,
            }).then((data) => {
                if (data.status === 400) {
                    alert("Bad Request");
                }
                else if (data.status === 401) {
                    alert("Token Expired");
                }
                else if (data.status === 403) {
                    alert("Forbidden");
                }
                else if (data.status === 404) {
                    alert("Not Found");
                }
                else if (data.status === 500) {
                    alert("Internal Server Error");
                }
                if (haveResponse) {
                    return data.json();
                }
            });
        });
    }
}
exports.APIManager = APIManager;
