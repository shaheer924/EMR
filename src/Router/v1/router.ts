import express, {Request, Response} from "express";
import UserController from "../../Controller/UserController";

const router = express.Router()

router.get('/check', (req: Request, res: Response)=> {
    // @ts-ignore
    res.send("<h1>Hello World</h1>")
})

router.post('/user/sign-up', UserController.signUp)
router.post('/user/sign-in', UserController.signIn)

router.post('/user', UserController.create)
router.get('/user', UserController.getAll)
router.get('/user/:id', UserController.getById)
router.get('/user/:cnic/get-family', UserController.getFamily)


export default router
