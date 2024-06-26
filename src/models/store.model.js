const { Schema, model, models } = require("mongoose");

const storeSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "user", required: true},
    province: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: {lat: Number, lng: Number}, required: true }
})

const Store = models?.store || model("store", storeSchema)
export default Store