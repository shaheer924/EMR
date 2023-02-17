"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepos_1 = __importDefault(require("./BaseRepos"));
const User_1 = __importDefault(require("../Model/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserRepos extends BaseRepos_1.default {
    constructor() {
        super(User_1.default);
    }
    signToken(id) {
        return {
            // @ts-ignore
            token: jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_STRING, {
                expiresIn: '2d'
            }),
            type: 'Bearer'
        };
    }
    decodeToken(token) {
        return jsonwebtoken_1.default.decode(token);
    }
}
exports.default = new UserRepos();
