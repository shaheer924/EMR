import BaseController from "./BaseController";
import UserRoleRepos from "../Repos/UserRoleRepos";

class UserRoleController extends BaseController{
    constructor() {
        super(UserRoleRepos);
    }
}

export default new UserRoleController()