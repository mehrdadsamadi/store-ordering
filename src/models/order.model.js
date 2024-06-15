import { PAYMENT_METHODS } from "@/helpers/paymentMethods";

const { Schema, model, models } = require("mongoose");

const orderSchema = new Schema({
    address: { type: Schema.Types.ObjectId, ref: "store", required: true },
    orderItems: { type: [Object], required: true },
    paymentMethod: { type: String, default: PAYMENT_METHODS.INTERNET.name, enum: [PAYMENT_METHODS.INTERNET.name, PAYMENT_METHODS.SPOT.name], required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: {lat: Number, lng: Number}, required: true }
})

const Store = models?.store || model("store", orderSchema)
export default Store