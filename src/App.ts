import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import * as mongoose from "mongoose";
import Router from "./Router/v1/router";
import {ErrorController} from "./Middleware/ErrorController";
import {PublicRouteHandle} from "./Middleware/PublicRouteHandle";

class App {
    public port: any;
    public app: any;
    public uri: string

    constructor(port: any, uri: string) {
        this.port = port
        this.app = express()
        this.uri = uri

        this.initializeMiddleware()
        this.initializeDatabase()
        this.initializeRouter()
        this.initializeErrorHandler()
    }

    private initializeMiddleware() {
        this.app.use(express.json())
        this.app.use(cors({
            origin: '*'
        }))
        this.app.use(morgan('dev'))
    }

    private initializeDatabase() {
        // @ts-ignore
        mongoose.connect(this.uri).then(r => {
            console.log("Database Connected Successfully")
        }).catch((err: Error) => {
            console.log(err)
        })
    }

    private initializeRouter() {
        this.app.use('/api/v1/', Router)
        this.app.use('*', PublicRouteHandle)
    }

    private initializeErrorHandler(){
        this.app.use(ErrorController)
    }
    public listen() {
        // @ts-ignore
        this.app.listen(this.port, () => {
            console.log(`Server is listening on PORT=${this.port}`)
        })
    }
}

export default App
