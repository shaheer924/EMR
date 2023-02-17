import mongoose, {Types} from 'mongoose'
import {IUser} from './Interfaces/IUser'
import bcrypt from 'bcryptjs'

// @ts-ignore
const UserModel = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cnic: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select: false
    },
    confirm_password: {
        type: String,
        required: [true, 'confirm password is required'],
        select: false,
        validate: function (password: string) {
            // @ts-ignore
            return this.password === password
        }
    },
    parent: {
        type: Types.ObjectId,
        ref: "users",
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    telephone_no: {
        type: String,
        required: true
    },
    city_id: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role_id: {
        type: String,
        required: true
    },

},{
    timestamps: true
})

UserModel.pre('save',async function () {
    this.password = await bcrypt.hash(this.password, 8)
    this.confirm_password = ""
})

UserModel.methods.correctPassword = async function(candidatePassword: string, userPassword: string){
    return await bcrypt.compare(candidatePassword, userPassword);
}


const User = mongoose.model('users', UserModel)

export default User
