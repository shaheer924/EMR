import {NextFunction, Request, Response} from "express";
import UserRepos from "../Repos/UserRepos";
import AppError from "../Utils/AppError";
import AdminUserRepos from "../Repos/AdminUserRepos";

export const AuthenticationMiddleware = async (req: Request,  res: Response, next: NextFunction) => {
    let token;
    // @ts-ignore
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // @ts-ignore
        token = req.headers.authorization.split(' ')[1]
    }
    // @ts-ignore
    let decoded = await UserRepos.decodeToken(token)
    // @ts-ignore
    const user = await AdminUserRepos.getById(decoded?.id)
    if(!user) return next(new AppError('unauthenticated', 400))

    // @ts-ignore
    req.user = user

    next()
}