import { ROLES } from "@/helpers/roles";

const { Schema, model, models } = require("mongoose");

const sessionSchema = new Schema({
    phone: { type: String, required: true },
    role: { type: String, required: true, enum: [ROLES.USER, ROLES.ADMIN, ROLES.DRIVER, ROLES.STORE_OWNER] },
    expire: {type: Date, default: (Date.now +( 7 * 24 * 60 * 60 * 1000))}
})

const Session = models?.session || model("session", sessionSchema)
export default Session