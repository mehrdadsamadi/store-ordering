const { Schema, model, models, Types } = require("mongoose");

const geoSchema = new Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
})

const storeSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    ownerId: { type: Types.ObjectId, ref: "user", required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: geoSchema, required: true }
})

const Store = models?.store || model("store", storeSchema)
export default Store