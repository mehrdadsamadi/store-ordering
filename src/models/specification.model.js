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
    brandId: { type: Types.ObjectId, ref: "brand" },
    categoryId: { type: Types.ObjectId, ref: "category" },
    specifications: { type: [specSchema], required: true }
    // productId: { type: Types.ObjectId, ref: "product" },
})

const Specification = models?.specification || model("specification", specificationSchema)
export default Specification