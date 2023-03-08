import mongoose, {Schema} from "mongoose";
import {IUserReports} from "./Interfaces/IUserReports";

const UserReportSchema = new mongoose.Schema<IUserReports>({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    report_type_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user_reports'
    },
    // pdf_file:{
    //     file: { type: Buffer, required: true },
    //     filename: { type: String, required: true },
    //     mimetype: { type: String, required: true }
    // },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const UserReport = mongoose.model('user_reports', UserReportSchema)

export default UserReport