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
class BaseController {
    constructor(repos) {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.repos.getAll();
            this.apiResponse('records fetch successfully', data, 200, res);
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const { id } = req.params;
            const data = yield this.repos.getById(id);
            this.apiResponse('record fetch successfully', data, 200, res);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const body = req.body;
            const data = yield this.repos.createOne(body);
            this.apiResponse('record created successfully', data, 200, res);
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const body = req.body;
            // @ts-ignore
            const { id } = req.params;
            const data = yield this.repos.updateById(id, body);
            this.apiResponse('record updated successfully', data, 200, res);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const { id } = req.params;
            const data = yield this.repos.deleteById(id);
            this.apiResponse('record deleted successfully', data, 200, res);
        });
        this.repos = repos;
    }
    apiResponse(message, data = {}, status, res, token = undefined) {
        // @ts-ignore
        res.status(status).json({
            message,
            success: true,
            data,
            token
        });
    }
}
exports.default = BaseController;
