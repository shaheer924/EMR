import mongoose, {Schema} from "mongoose";
import {IAdminUser} from "./Interfaces/IAdminUser";
import validator from "validator";
import bcrypt from 'bcryptjs'

const AdminUserSchema = new mongoose.Schema<IAdminUser>({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    image: {
        type: String
    },
    // @ts-ignore
    email: {
        type: String,
        unique: [true, 'email is unique'],
        required: [true, 'email is required'],
        validate: function (value: string) {
            return validator.isEmail(value)
        },
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select: false
    },
    confirm_password: {
        type: String,
        required: [true, 'confirm_password is required'],
        validate: function (value: string) {
            // @ts-ignore
            return this.password == value
        }
    },
    role_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user_roles'
    },
    healthCarePlace_id: {
        type: mongoose.Types.ObjectId,
        ref: 'health_care_places'
    }
})

AdminUserSchema.pre('save', async function(){
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, 8)
    // @ts-ignore
    this.confirm_password = undefined
})

AdminUserSchema.methods.correctPassword = async function(candidatePassword: string, userPassword: string){
    return await bcrypt.compare(candidatePassword, userPassword);
}

const AdminUser = mongoose.model('admin_users', AdminUserSchema)

export default AdminUser
