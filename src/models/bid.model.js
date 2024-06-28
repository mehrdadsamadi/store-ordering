const { Schema, model, models } = require("mongoose");

const bidSchema = new Schema({
    driver: { type: Schema.Types.ObjectId, ref: "user", required: true},
    order: { type: Schema.Types.ObjectId, ref: "order", required: true},
    shippingCost: { type: String, required: true },
}, {
    timestamps: true
})

const Bid = models?.bid || model("bid", bidSchema)
export default Bid