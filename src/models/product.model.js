const { Schema, model, models, Types } = require("mongoose");

const productSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: "category" },
    brand: { type: Schema.Types.ObjectId, ref: "brand" },
    specs: { type: Schema.Types.ObjectId, ref: "specification" },
    features: { type: Schema.Types.ObjectId, ref: "feature" },
    description: { type: String },
    name: { type: String, required: true },
    images: {type: [String], required: true},
    slug: {type: String, required: true},
    visible: {type: Boolean, default: true},
})

const Product = models?.product || model("product", productSchema)
export default Product