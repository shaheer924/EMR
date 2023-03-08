import BaseController from "./BaseController";
import CityRepos from "../Repos/CityRepos";

class CityController extends BaseController{
    constructor() {
        super(CityRepos);
    }
}

export default new CityController()