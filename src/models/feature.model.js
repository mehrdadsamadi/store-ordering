const { Schema, model, models, Types } = require("mongoose");

const featurInfoSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: String, required: true },
    image: { type: String, required: true },
    wholesale_quantity: { type: Number, required: true },
    wholesale_price: { type: Number, required: true },
    retail_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    available: { type: Boolean, default: true },
})

const featurBodySchema = new Schema({
    featureTitle: { type: String, required: true },
    features: { type: [featurInfoSchema], required: true },
})

const featureSchema = new Schema({
    product: { type: Types.ObjectId, ref: "product" },
    features: { type: [featurBodySchema], required: true }
})

const Feature = models?.feature || model("feature", featureSchema)
export default Feature