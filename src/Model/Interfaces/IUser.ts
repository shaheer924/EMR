import {Types} from "mongoose";

export interface IUser {
    _id: string
    name: string,
    email: string,
    cnic: string,
    parent: any,
    phone_no: string,
    telephone_no: string,
    city_id: string,
    address: string,
    role_id: string,
    password: string,
    confirm_password: string
}
