import BaseController from "./BaseController";
import HealthCarePlaceTypeRepos from "../Repos/HealthCarePlaceTypeRepos";

class HealthCarePlaceTypeController extends BaseController{
    constructor() {
        super(HealthCarePlaceTypeRepos);
    }
}

export default new HealthCarePlaceTypeController()