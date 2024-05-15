const { Schema, model, models } = require("mongoose");

const brandSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
})

const Brand = models?.brand || model("brand", brandSchema)
export default Brand