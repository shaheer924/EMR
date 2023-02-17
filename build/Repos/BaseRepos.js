"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepos {
    constructor(model) {
        this.model = model;
    }
    getAll() {
        return this.model.find();
    }
    getById(id) {
        return this.model.findOne({ _id: id });
    }
    createOne(data) {
        return this.model.create(data);
    }
    updateById(id, data) {
        return this.model.updateOne({ _id: id }, data);
    }
    deleteById(id) {
        return this.model.deleteOne({ _id: id });
    }
}
exports.default = BaseRepos;
