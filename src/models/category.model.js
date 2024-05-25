const { Schema, model, models, Types } = require("mongoose");

const categorySchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: "category" },
    specs: { type: Types.ObjectId, ref: "specification" },
    image: { type: String },
})

const Category = models?.category || model("category", categorySchema)
export default Category