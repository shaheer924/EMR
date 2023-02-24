import BaseRepos from "./BaseRepos";
import AdminUser from "../Model/AdminUser";

class AdminUserRepos extends BaseRepos{
    constructor() {
        super(AdminUser);
    }
}

export default new AdminUserRepos()