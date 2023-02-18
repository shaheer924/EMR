import BaseController from './BaseController'
import User from "../Model/User";
import {NextFunction, Request, Response} from "express";
import UserRepos from "../Repos/UserRepos";
import AppError from "../Utils/AppError";
import {Expression, Schema} from "mongoose";

class UserController extends BaseController{
    constructor() {
        super(UserRepos);
    }

    signUp = async (req: Request, res: Response, next: NextFunction) => {
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
            const {email, password, cnic, role_id} = req.body
            if(!role_id) return next(new AppError('Please provide role to sign in', 400))
            let user;

            if(role_id == 1) {
                user = await UserRepos.model.findOne({cnic: cnic}).select('+password')
            } else {
                user = await UserRepos.model.findOne({email: email}).select('+password')
            }

            if(!user) return next(new AppError('No user found in database', 404))
            const condition = await user.correctPassword(password, user.password)
            if(!condition) return next(new AppError('Incorrect password', 404))

            let data = await UserRepos.updateById(user._id, {is_last_login: new Date()})
            let token = UserRepos.signToken(user._id)
            this.apiResponse('User sign in successful',data,200, res, token)

        } catch (e) {
            console.log(e)
        }
    }

    createUser = async (req: Request, res: Response) => {
        try {
            // @ts-ignore
            const data = req.body
            //check if user is present
            const user = await UserRepos.model.findOne({ cnic: data.cnic }).select('+is_last_login')
            let parent_user = await UserRepos.model.findOne( { cnic: data.parent_cnic } )

            if(!parent_user){
                parent_user = await UserRepos.model.create({
                    "first_name": undefined,
                    "last_name": undefined,
                    "cnic": data.parent_cnic,
                    "role_id": data.role_id,
                    "address": data.address,
                    "city_id": data.city_id,
                    "telephone_no": data.telephone_no,
                    "phone_no": data.phone_no,
                    "password": "12345678",
                    "confirm_password":"12345678",
                    "email": "dummy@yopmail.com",
                    "name": "dummy"
                })
            }

            data.parent = parent_user._id
            let created_user
            //if user is present then check if user is already loggedIn
            console.log(user)
            if(user){

                if(user.is_last_login){
                    throw new Error('User already created')
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
            throw new AppError(e, 500)
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
