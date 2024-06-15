const { Schema, model, models } = require("mongoose");

const brandSchema = new Schema({
    name: { type: String, required: true },
    specs: { type: Schema.Types.ObjectId, ref: "specification" },
    image: { type: String },
})

const Brand = models?.brand || model("brand", brandSchema)
export default Brand