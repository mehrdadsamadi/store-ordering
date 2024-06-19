import { ROLES } from "@/helpers/roles";

const { Schema, model, models } = require("mongoose");

const userSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    avatar: { type: String },
    phone: { type: String, required: true },
    otp: {type: Object, default: {
        code: 0,
        expiresIn: 0
    }},
    role: { type: String, default: ROLES.USER, enum: (Object.keys(ROLES).map(key => ROLES[key])) }
}, {
    timestamps: true
})

const User = models?.user || model("user", userSchema)
export default User