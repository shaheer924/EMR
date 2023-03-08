import mongoose, {Schema} from "mongoose";
import {ICity} from "./Interfaces/ICity";

const CitySchema = new mongoose.Schema<ICity>({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const City = mongoose.model('cities', CitySchema)

export default City