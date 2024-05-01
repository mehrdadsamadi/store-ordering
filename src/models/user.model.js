const { Schema, model, models } = require("mongoose");

const userSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    avatar: { type: String },
    phone: { type: String, required: true },
    role: { type: String, default: "USER" }
})

const User = models?.user || model("user", userSchema)
export default User