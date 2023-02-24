import BaseRepos from "./BaseRepos";
import City from "../Model/City";

class CityRepos extends BaseRepos{
    constructor() {
        super(City);
    }
}

export default new CityRepos()