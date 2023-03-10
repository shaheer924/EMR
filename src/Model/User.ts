import mongoose, {Schema, Types} from 'mongoose'
import {IUser} from './Interfaces/IUser'
import bcrypt from 'bcryptjs'


// @ts-ignore
const UserModel = new mongoose.Schema<IUser>({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    cnic: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    parental_cnic: {
        type: String,
        required: true,
    },
    maternal_cnic: {
        type: String,
        required: true,
    },
    city_id: {
        type: mongoose.Types.ObjectId,
        ref: 'cities',
    },
    address: {
        type: String,
        required: false
    },
    postal_code:{
        type: String
    },
    phone_no: {
        type: String,
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
    },
    is_last_login: {
        type: Date
    }
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
