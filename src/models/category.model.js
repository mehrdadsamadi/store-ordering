const { Schema, model, models, Types } = require("mongoose");

const categorySchema = new Schema({
    name: { type: String },
    parent: { type: Types.ObjectId, ref: "category" },
    image: { type: String },
})

const Category = models?.category || model("category", categorySchema)
export default Category