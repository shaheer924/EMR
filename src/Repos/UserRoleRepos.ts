import BaseRepos from "./BaseRepos";
import UserRole from "../Model/UserRole";

class UserRoleRepos extends BaseRepos{
    constructor() {
        super(UserRole);
    }
}

export default new UserRoleRepos()