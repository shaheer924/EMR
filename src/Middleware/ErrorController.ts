import {NextFunction, Request, Response} from "express";

export const ErrorController = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    res.status(err.statusCode).json({
        success: true,
        message: err.message,
        error: err,
        stack: err.stack
    })
}