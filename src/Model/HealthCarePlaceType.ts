import mongoose, {Schema} from "mongoose";
import {IHealthCarePlaceTypes} from "./Interfaces/IHealthCarePlaceTypes";

const HealthCarePlaceTypeSchema = new mongoose.Schema<IHealthCarePlaceTypes>({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const HealthCarePlaceType = mongoose.model('health_care_place_types', HealthCarePlaceTypeSchema)

export default HealthCarePlaceType