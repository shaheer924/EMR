import BaseRepos from "./BaseRepos";
import Faq from "../Model/Faq";

class FaqRepos extends BaseRepos{
    constructor() {
        super(Faq);
    }
}

export default new FaqRepos()