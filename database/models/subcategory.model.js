import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        unique: [true, 'name is required'],
        lowercase: true,
        required: true
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true, versionKey: false })


export const SubCategory = mongoose.model('SubCategory', schema)



