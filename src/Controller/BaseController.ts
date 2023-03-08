import {NextFunction, Request, Response} from "express";
import AppError from "../Utils/AppError";

class BaseController{
    public repos: any
    constructor(repos: any) {
        this.repos = repos
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.repos.getAll()
            this.apiResponse('records fetch successfully', data ,200, res)
        } catch (e) {
            return next(new AppError(`Error: ${JSON.stringify(e)}`,500))
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const {id} = req.params
            const data = await this.repos.getById(id)
            this.apiResponse('record fetch successfully', data ,200, res)
        } catch (e) {
            return next(new AppError(`Error: ${JSON.stringify(e)}`,500))
        }

    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const body = req.body
            const data = await this.repos.createOne(body)
            this.apiResponse('record created successfully', data ,200, res)
        } catch (e) {
            return next(new AppError(`Error: ${JSON.stringify(e)}`,500))
        }

    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const body = req.body
            // @ts-ignore
            const {id} = req.params
            const data = await this.repos.updateById(id, body)
            this.apiResponse('record updated successfully', data ,200, res)
        } catch (e) {
            return next(new AppError(`Error: ${JSON.stringify(e)}`,500))
        }

    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const {id} = req.params
            const data = await this.repos.deleteById(id)
            this.apiResponse('record deleted successfully', data ,200, res)
        } catch (e) {
            return next(new AppError(`Error: ${JSON.stringify(e)}`,500))
        }
    }

    apiResponse(message: string, data: any = {}, status: number, res: Response, token: any = undefined){
        // @ts-ignore
        res.status(status).json({
            message,
            success: true,
            data,
            token
        })
    }
}

export default BaseController
