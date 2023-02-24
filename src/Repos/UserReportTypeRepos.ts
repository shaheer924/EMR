import BaseRepos from "./BaseRepos";
import UserReportType from "../Model/UserReportType";

class UserReportTypeRepos extends BaseRepos{
    constructor() {
        super(UserReportType);
    }
}

export default new UserReportTypeRepos()