const { Schema, model, models, Types } = require("mongoose");

const brandSchema = new Schema({
    name: { type: String, required: true },
    specs: { type: Types.ObjectId, ref: "specification" },
    image: { type: String },
})

const Brand = models?.brand || model("brand", brandSchema)
export default Brand