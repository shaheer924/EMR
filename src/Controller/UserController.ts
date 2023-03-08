import BaseController from './BaseController'
import {NextFunction, Request, Response} from "express";
import UserRepos from "../Repos/UserRepos";
import AppError from "../Utils/AppError";
import AdminUserRepos from "../Repos/AdminUserRepos";

class UserController extends BaseController{
    constructor() {
        super(UserRepos);
    }

    createAdminUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const data: any = req.body

            if(!data) return next(new AppError('Please create your account first', 404))

            const user = await UserRepos.createOne(data)

            let token = UserRepos.signToken(user._id)

            this.apiResponse('User sign up successful',user, 200, res, token)

        } catch (e) {
            console.log(e)
        }
    }

    signIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const {email, password, cnic, role} = req.body
            if(email && !role) return next(new AppError('Please provide role to sign in', 400))
            let user;

            if(!role && !email) {
                user = await UserRepos.model.findOne({cnic: cnic}).select('+password')
            } else {
                user = await AdminUserRepos.model.findOne({email: email}).select('+password')
            }

            if(!user) return next(new AppError('No user found in database', 404))
            const condition = await user.correctPassword(password, user.password)
            if(!condition) return next(new AppError('Incorrect password', 404))
            let data
            if(cnic) data = await UserRepos.updateById(user._id, {is_last_login: new Date()})
            else data = await AdminUserRepos.model.findOne({_id: user._id})
            let token = UserRepos.signToken(user._id)
            this.apiResponse('User sign in successful',data,200, res, token)

        } catch (e) {
            return next(new AppError(JSON.stringify(e),400))
        }
    }

    createPatientUser = async (req: Request, res: Response,next: NextFunction) => {
        try {
            // @ts-ignore
            const data = req.body
            if(!data.parental_cnic) return next(new AppError('Please provide parent cnic', 400))
            //check if user is present
            const user = await UserRepos.model.findOne({ cnic: data.cnic }).select('+is_last_login')
            let parent_user = await UserRepos.model.findOne( { cnic: data.parental_cnic } )

            if(!parent_user){
                parent_user = await UserRepos.createDummyUser(data.parental_cnic, data.city_id, data.address, data.telephone_no, data.phone_no)
            }

            data.parent = parent_user._id
            let created_user
            //if user is present then check if user is already loggedIn
            if(user){
                if(user.is_last_login){
                    return next( new AppError('User already created',400))
                }
                //if not user have to update their details
                await UserRepos.updateById(user._id, data)
                created_user = await UserRepos.getById(user._id)
            }
            else {
                //if user not found then create new user
                created_user = await UserRepos.createOne(data)
            }

            this.apiResponse('record created successfully', created_user, 200, res)
        } catch (e) {
            // @ts-ignore
            return next(new AppError(e, 500))
        }
    }


    getFamily = async (req: Request, res: Response) => {
        try {
            // @ts-ignore
            const {cnic} = req.params

            const user = await UserRepos.model.findOne({ cnic: cnic })
            if(!user) throw new Error('please provide valid cnic')

            // @ts-ignore
            let data = await UserRepos.model.aggregate([
                { $match: { "_id": user._id } },
                {
                    $graphLookup: {
                        from: 'users',
                        startWith: "$parent",
                        connectFromField: "parent",
                        connectToField: "_id",
                        as: "parents"
                    }
                }
            ])
            // @ts-ignore
            this.apiResponse('record fetched successfully', data, 200, res)
        } catch (e) {
            console.log(e)
        }

    }
}

export default new UserController()
