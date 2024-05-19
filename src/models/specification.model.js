const { Schema, model, models, Types } = require("mongoose");

const subtitlesSchema = new Schema({
    subtitle: { type: String, required: true },
    desc: { type: String, required: true },
})

const specSchema = new Schema({
    specTitle: { type: String, required: true },
    subtitles: { type: [subtitlesSchema], required: true },
})

const specificationSchema = new Schema({
    brand: { type: Types.ObjectId, ref: "brand" },
    category: { type: Types.ObjectId, ref: "category" },
    product: { type: Types.ObjectId, ref: "product" },
    specifications: { type: [specSchema], required: true }
})

const Specification = models?.specification || model("specification", specificationSchema)
export default Specification