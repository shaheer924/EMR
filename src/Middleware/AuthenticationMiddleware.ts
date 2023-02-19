import {NextFunction, Request, Response} from "express";
import UserRepos from "../Repos/UserRepos";
import AppError from "../Utils/AppError";

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
    const user = await UserRepos.getById(decoded?.id)
    if(!user) return next(new AppError('unauthenticated', 400))

    // @ts-ignore
    req.user = user

    next()
}