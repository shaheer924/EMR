import mongoose, {Schema} from "mongoose";
import {IUserRoles} from "./Interfaces/IUserRoles";

const UserRoleSchema = new mongoose.Schema<IUserRoles>({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const UserRole = mongoose.model('user_roles', UserRoleSchema)

export default UserRole