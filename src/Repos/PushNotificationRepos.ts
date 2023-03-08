import BaseRepos from "./BaseRepos";
import PushNotification from "../Model/PushNotification";

class PushNotificationRepos extends BaseRepos{
    constructor() {
        super(PushNotification);
    }
}

export default new PushNotificationRepos()