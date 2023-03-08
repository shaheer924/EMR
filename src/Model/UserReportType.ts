import mongoose, {Schema} from "mongoose";
import {IUserReportTypes} from "./Interfaces/IUserReportTypes";

const UserReportTypeSchema = new mongoose.Schema<IUserReportTypes>({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const UserReportType = mongoose.model('user_report_types', UserReportTypeSchema)

export default UserReportType