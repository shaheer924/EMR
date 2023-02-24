import mongoose, {Schema} from "mongoose";
import {IAdminUser} from "./Interfaces/IAdminUser";
import validator from "validator";

const AdminUserSchema = new mongoose.Schema<IAdminUser>({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: function (value: string) {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    confirm_password: {
        type: String,
        required: [true, 'confirm_password is required']
    },
    role_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user_roles'
    }
})

const AdminUser = mongoose.model('admin_users', AdminUserSchema)

export default AdminUser