import BaseRepos from "./BaseRepos";
import Page from "../Model/Page";

class PageRepos extends BaseRepos{
    constructor() {
        super(Page);
    }
}

export default new PageRepos()