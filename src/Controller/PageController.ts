import BaseController from "./BaseController";
import PageRepos from "../Repos/PageRepos";

class PageController extends BaseController{
    constructor() {
        super(PageRepos);
    }
}

export default new PageController()