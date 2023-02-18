import {NextFunction, Request, Response} from "express";
import AppError from "../Utils/AppError";

export const PublicRouteHandle = (req: Request, res: Response, next: NextFunction) => {
    return next(new AppError('No route found', 404))
}