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
}

export default new UserRepos()
