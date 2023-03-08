import mongoose, {Schema} from "mongoose";
import {IHealthCarePlaces} from "./Interfaces/IHealthCarePlaces";

const HealthCarePlaceSchema = new mongoose.Schema<IHealthCarePlaces>({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    email: {
       type: String
    },
    phone_no: {
        type: String
    },
    state: {
       type: String
    },
    country: {
        type: String
    },
    type_id: {
        type: mongoose.Types.ObjectId,
        ref: 'health_care_place_type'
    }
}, {
    timestamps: true
})

const HealthCarePlace = mongoose.model('health_care_places', HealthCarePlaceSchema)

export default HealthCarePlace