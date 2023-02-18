import {Request, Response} from "express";

class BaseController{
    public repos: any
    constructor(repos: any) {
        this.repos = repos
    }

    getAll = async (req: Request, res: Response) => {
        const data = await this.repos.getAll()
        this.apiResponse('records fetch successfully', data ,200, res)
    }

    getById = async (req: Request, res: Response) => {
        // @ts-ignore
        const {id} = req.params
        const data = await this.repos.getById(id)
        this.apiResponse('record fetch successfully', data ,200, res)
    }

    create = async (req: Request, res: Response) => {
        // @ts-ignore
        const body = req.body
        const data = await this.repos.createOne(body)
        this.apiResponse('record created successfully', data ,200, res)
    }

    update = async (req: Request, res: Response) => {
        // @ts-ignore
        const body = req.body
        // @ts-ignore
        const {id} = req.params
        const data = await this.repos.updateById(id, body)
        this.apiResponse('record updated successfully', data ,200, res)
    }

    delete = async (req: Request, res: Response) => {
        // @ts-ignore
        const {id} = req.params
        const data = await this.repos.deleteById(id)
        this.apiResponse('record deleted successfully', data ,200, res)
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
