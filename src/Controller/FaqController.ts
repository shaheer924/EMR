import BaseController from "./BaseController";
import FaqRepos from "../Repos/FaqRepos";

class FaqController extends BaseController{
    constructor() {
        super(FaqRepos);
    }
}

export default new FaqController()