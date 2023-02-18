class AppError extends Error{
    public statusCode: number
    public message: string
    public isOperational: boolean
    constructor(message: any, statusCode: number) {
        super(message);
        this.statusCode = statusCode || 500
        this.message = message
        this.isOperational = true

        // @ts-ignore
        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError;