import mongoose, {Schema} from "mongoose";
import {IPages} from "./Interfaces/IPages";

const PageSchema = new mongoose.Schema<IPages>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Page = mongoose.model('pages', PageSchema)

export default Page