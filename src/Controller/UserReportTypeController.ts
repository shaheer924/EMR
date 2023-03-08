import BaseController from "./BaseController";
import UserReportTypeRepos from "../Repos/UserReportTypeRepos";

class UserReportTypeController extends BaseController{
    constructor() {
        super(UserReportTypeRepos);
    }
}

export default new UserReportTypeController()