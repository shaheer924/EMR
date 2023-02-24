import mongoose, {Schema} from "mongoose";
import {IPushNotifications} from "./Interfaces/IPushNotifications";

const PushNotificationSchema = new mongoose.Schema<IPushNotifications>({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    role_id:{
        type: mongoose.Types.ObjectId,
        ref: 'user_roles'
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
})

const PushNotification = mongoose.model('push_notification', PushNotificationSchema)

export default PushNotification