import mongoose, {Schema} from "mongoose";
import {IUserRoles} from "./Interfaces/IUserRoles";

const UserRoleSchema = new mongoose.Schema<IUserRoles>({
    // @ts-ignore
    name: {
        type: String,
        required: [true, 'user role is required'],
        unique: [true, 'user role name is unique']
    }
}, {
    timestamps: true
})

const UserRole = mongoose.model('user_roles', UserRoleSchema)

export default UserRole
