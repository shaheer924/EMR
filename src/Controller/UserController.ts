import BaseController from './BaseController'
import User from "../Model/User";
import {Request, Response} from "express";
import UserRepos from "../Repos/UserRepos";

class UserController extends BaseController{
    constructor() {
        super(UserRepos);
    }

    signUp = async (req: Request, res: Response) => {
        try {
            // @ts-ignore
            const data: any = req.body

            if(!data) throw new Error('Please Provide user to create')

            const user = await UserRepos.createOne(data)

            let token = UserRepos.signToken(user._id)

            this.apiResponse('User sign up successful',user, 200, res, token)

        } catch (e) {
            console.log(e)
        }
    }

    signIn = async (req: Request, res: Response) => {
        try {
            // @ts-ignore
            const {email, password, cnic, role_id} = req.body
            if(!role_id) throw new Error('please provide role_id to sign in')
            let user;

            if(role_id == 1) {
                user = await UserRepos.model.findOne({cnic: cnic}).select('+password')
            } else {
                user = await UserRepos.model.findOne({email: email}).select('+password')
            }

            if(!user) throw new Error('No User Found in database')
            const condition = await user.correctPassword(password, user.password)
            if(!condition) throw new Error('password is incorrect')
            let data = await UserRepos.getById(user._id)
            let token = UserRepos.signToken(user._id)
            this.apiResponse('User sign in successful',data,200, res, token)

        } catch (e) {
            console.log(e)
        }
    }

    createUser = async (req: Request, res: Response) => {
        try {
            // @ts-ignore
            const data = await req.body

            //check if user is present
            const user = await UserRepos.model.findOne({ cnic: data.cnic })

            let parent_user = UserRepos.model.findOne( { cnic: data.parent_cnic } )

            if(!parent_user){
                parent_user = await UserRepos.model.create({
                    "first_name": undefined,
                    "last_name": undefined,
                    "cnic": data.parent_cnic,
                    "role_id": data.role_id
                },{
                    validateBeforeSave: false
                })
            }

            data.parent = parent_user._id

            let created_user
            //if user is present then check if user is already loggedIn
            if(user){
                if(user.is_last_login){
                    throw new Error('User already created')
                }
                //if not user have to update their details
                created_user = await UserRepos.updateById(user._id, data)
            }
            else {
                //if user not found then create new user
                created_user = await UserRepos.createOne(data)
            }
        } catch (e) {
            console.log(e)
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
