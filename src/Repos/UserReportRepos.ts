import BaseRepos from "./BaseRepos";
import UserReport from "../Model/UserReport";

class UserReportRepos extends BaseRepos{
    constructor() {
        super(UserReport);
    }
}

export default new UserReportRepos()