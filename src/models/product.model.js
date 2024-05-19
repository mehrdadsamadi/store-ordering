const { Schema, model, models, Types } = require("mongoose");

const productSchema = new Schema({
    category: { type: Types.ObjectId, ref: "category" },
    brand: { type: Types.ObjectId, ref: "brand" },
    specs: { type: Types.ObjectId, ref: "specifications" },
    description: { type: String },
    name: { type: String, required: true },
    images: {type: [String], required: true},
    slug: {type: String, required: true},
    wholesale_quantity: {type: Number, required: true},
    wholesale_price: {type: Number, required: true},
    retail_price: {type: Number, required: true},
    available: {type: Boolean, default: true},
})

const Product = models?.product || model("product", productSchema)
export default Product