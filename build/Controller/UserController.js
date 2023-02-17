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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = __importDefault(require("./BaseController"));
const UserRepos_1 = __importDefault(require("../Repos/UserRepos"));
class UserController extends BaseController_1.default {
    constructor() {
        super(UserRepos_1.default);
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const data = req.body;
                if (!data)
                    throw new Error('Please Provide user to create');
                const user = yield UserRepos_1.default.createOne(data);
                let token = UserRepos_1.default.signToken(user._id);
                this.apiResponse('User sign up successful', user, 200, res, token);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const { email, password, cnic, role_id } = req.body;
                if (!role_id)
                    throw new Error('please provide role_id to sign in');
                let user;
                if (role_id == 1) {
                    user = yield UserRepos_1.default.model.findOne({ cnic: cnic }).select('+password');
                }
                else {
                    user = yield UserRepos_1.default.model.findOne({ email: email }).select('+password');
                }
                if (!user)
                    throw new Error('No User Found in database');
                const condition = yield user.correctPassword(password, user.password);
                if (!condition)
                    throw new Error('password is incorrect');
                let data = yield UserRepos_1.default.getById(user._id);
                let token = UserRepos_1.default.signToken(user._id);
                this.apiResponse('User sign in successful', data, 200, res, token);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const data = yield req.body;
                //check if user is present
                const user = yield UserRepos_1.default.model.findOne({ cnic: data.cnic });
                let parent_user = UserRepos_1.default.model.findOne({ cnic: data.parent_cnic });
                if (!parent_user) {
                    parent_user = yield UserRepos_1.default.model.create({
                        "first_name": undefined,
                        "last_name": undefined,
                        "cnic": data.parent_cnic,
                        "role_id": data.role_id
                    }, {
                        validateBeforeSave: false
                    });
                }
                data.parent = parent_user._id;
                let created_user;
                //if user is present then check if user is already loggedIn
                if (user) {
                    if (user.is_last_login) {
                        throw new Error('User already created');
                    }
                    //if not user have to update their details
                    created_user = yield UserRepos_1.default.updateById(user._id, data);
                }
                else {
                    //if user not found then create new user
                    created_user = yield UserRepos_1.default.createOne(data);
                }
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getFamily = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const { cnic } = req.params;
                const user = yield UserRepos_1.default.model.findOne({ cnic: cnic });
                if (!user)
                    throw new Error('please provide valid cnic');
                // @ts-ignore
                let data = yield UserRepos_1.default.model.aggregate([
                    { $match: { "_id": user._id } },
                    {
                        $graphLookup: {
                            from: 'users',
                            startWith: "$parent",
                            connectFromField: "parent",
                            connectToField: "_id",
                            as: "parents"
                        }
                    }
                ]);
                // @ts-ignore
                this.apiResponse('record fetched successfully', data, 200, res);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = new UserController();
