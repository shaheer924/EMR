import BaseController from "./BaseController";
import HealthCarePlaceRepos from "../Repos/HealthCarePlaceRepos";

class HealthCarePlaceController extends BaseController{
    constructor() {
        super(HealthCarePlaceRepos);
    }
}

export default new HealthCarePlaceController()