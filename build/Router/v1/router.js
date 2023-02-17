"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../../Controller/UserController"));
const router = express_1.default.Router();
router.get('/check', (req, res) => {
    // @ts-ignore
    res.send("<h1>Hello World</h1>");
});
router.post('/user/sign-up', UserController_1.default.signUp);
router.post('/user/sign-in', UserController_1.default.signIn);
router.post('/user', UserController_1.default.create);
router.get('/user', UserController_1.default.getAll);
router.get('/user/:id', UserController_1.default.getById);
router.get('/user/:cnic/get-family', UserController_1.default.getFamily);
exports.default = router;
