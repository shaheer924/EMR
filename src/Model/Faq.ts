import mongoose, {Schema} from "mongoose";
import {IFaqs} from "./Interfaces/IFaqs";

const FaqSchema = new mongoose.Schema<IFaqs>({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Faq = mongoose.model('faqs', FaqSchema)

export default Faq