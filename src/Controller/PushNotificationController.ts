import BaseController from "./BaseController";
import PushNotificationRepos from "../Repos/PushNotificationRepos";

class PushNotificationController extends BaseController{
    constructor() {
        super(PushNotificationRepos);
    }
}

export default new PushNotificationController()