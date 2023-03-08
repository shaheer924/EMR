import BaseRepos from "./BaseRepos";
import HealthCarePlace from "../Model/HealthCarePlace";

class HealthCarePlaceRepos extends BaseRepos{
    constructor() {
        super(HealthCarePlace);
    }
}

export default new HealthCarePlaceRepos()