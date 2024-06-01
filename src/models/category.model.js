const { Schema, model, models, Types } = require("mongoose");

const categorySchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: "category" },
    specs: { type: Schema.Types.ObjectId, ref: "specification" },
    image: { type: String },
})

const Category = models?.category || model("category", categorySchema)
export default Category