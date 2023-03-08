import BaseRepos from "./BaseRepos";
import User from "../Model/User";
import jwt from 'jsonwebtoken'

class UserRepos extends BaseRepos{
    constructor() {
        super(User);
    }

    public signToken(id: string){
        return {
            // @ts-ignore
            token: jwt.sign({id: id},process.env.JWT_STRING,{
                expiresIn: '2d'
            }),
            type: 'Bearer'
        }
    }

    public decodeToken (token: string) {
        return jwt.decode(token)
    }

    public createDummyUser (cnic: any, city_id: string, address: string, telephone_no: string, phone_no: string) {
        const dummyUser = new User({
            "first_name": "dummy first",
            "last_name": "dummy second",
            "cnic": cnic,
            "address": address,
            "city_id": city_id,
            "telephone_no": telephone_no,
            "phone_no": phone_no,
            "password": "12345678",
            "parental_cnic": "2342343424333",
            "maternal_cnic": "5446456546564",
            "confirm_password":"12345678",
            "email": "dummy@yopmail.com",
            "name": "dummy"
        })
        return dummyUser.save()
    }
}

export default new UserRepos()
