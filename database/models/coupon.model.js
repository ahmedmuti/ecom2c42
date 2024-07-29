import mongoose from "mongoose";

const schema = new mongoose.Schema({
    code: String,
    expires: Date,
    discount: Number
}, { timestamps: true, versionKey: false })

export const Coupon = mongoose.model('Coupon', schema)



