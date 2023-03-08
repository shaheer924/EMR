import BaseController from "./BaseController";
import UserReportRepos from "../Repos/UserReportRepos";

class UserReportController extends BaseController{
    constructor() {
        super(UserReportRepos);
    }
}

export default new UserReportController()