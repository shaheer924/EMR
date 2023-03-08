import BaseRepos from "./BaseRepos";
import HealthCarePlaceType from "../Model/HealthCarePlaceType";

class HealthCarePlaceTypeRepos extends BaseRepos{
    constructor() {
        super(HealthCarePlaceType);
    }
}

export default new HealthCarePlaceTypeRepos()