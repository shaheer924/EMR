import express, {Request, Response} from "express";
import UserController from "../../Controller/UserController";
// @ts-ignore
import catchAsync from '../../Utils/Handle'

const router = express.Router()

router.get('/check', (req: Request, res: Response)=> {
    // @ts-ignore
    res.send("<h1>Hello World</h1>")
})

router.post('/user/sign-up', UserController.signUp)
router.post('/user/sign-in', UserController.signIn)

router.post('/user', UserController.createUser)
router.get('/user', UserController.getAll)
router.get('/user/:id', catchAsync(UserController.getById))
router.get('/user/:cnic/get-family', catchAsync(UserController.getFamily))


export default router
