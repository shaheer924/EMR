import {checkSchema} from 'express-validator';
import UserRepos from "../Repos/UserRepos";

export const UserMiddleware = checkSchema( {
    name: {
        errorMessage: 'name is required',
        isLength: {
            options: {min: 3, max: 25},
            errorMessage: 'name must at least 3 characters long',
        },
        trim: true
    },
    email: {
        errorMessage: 'email is required',
        isEmail: {
            bail: true,
            errorMessage: 'please provide valid email'
        }
    },
    password: {
        errorMessage: 'password is required',
        isLength: {
            options: {min: 6}
        }
    },
    confirm_password: {
        errorMessage: 'confirm password is required'
    },
    cnic: {
        errorMessage: 'cnic is required',
        custom: {
            options: async (value: string) => {
                const user = await UserRepos.model.findOne({cnic: value})
                return !user;
            },
            errorMessage: 'cnic already in use'
        }
    }
})