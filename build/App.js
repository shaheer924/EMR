"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose = __importStar(require("mongoose"));
const router_1 = __importDefault(require("./Router/v1/router"));
class App {
    constructor(port, uri) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.uri = uri;
        this.initializeMiddleware();
        this.initializeDatabase();
        this.initializeRouter();
    }
    initializeMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: '*'
        }));
        this.app.use((0, morgan_1.default)('dev'));
    }
    initializeDatabase() {
        // @ts-ignore
        mongoose.connect(this.uri).then(r => {
            console.log("Database Connected Successfully");
        }).catch((err) => {
            console.log(err);
        });
    }
    initializeRouter() {
        this.app.use('/api/v1/', router_1.default);
    }
    listen() {
        // @ts-ignore
        this.app.listen(this.port, () => {
            console.log(`Server is listening on PORT=${this.port}`);
        });
    }
}
exports.default = App;
