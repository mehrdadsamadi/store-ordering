import { ORDER_STATUSES } from "@/helpers/orderStatuses";
import { PAYMENT_METHODS } from "@/helpers/paymentMethods";

const { Schema, model, models } = require("mongoose");

const orderSchema = new Schema({
    address: { type: Schema.Types.ObjectId, ref: "store", required: true },
    items: { type: [Object], required: true },
    paymentMethod: { type: String, default: PAYMENT_METHODS.INTERNET.name, enum: (Object.keys(PAYMENT_METHODS).map(key => PAYMENT_METHODS[key].name)) },
    paid: { type: Boolean, default: false },
    status: { type: String, default: ORDER_STATUSES.PROCESSING.name, enum: (Object.keys(ORDER_STATUSES).map(key => ORDER_STATUSES[key].name)) },
    userPhone: { type: String, required: true },
    price: { type: String, required: true }
}, {
    timestamps: true
})

const Order = models?.order || model("order", orderSchema)
export default Order