import mongoose from "mongoose";
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
    image: String
}, { timestamps: true, versionKey: false })

schema.post('init', function (doc) {
    doc.image = process.env.BASE_URL + "categories/" + doc.image
})

export const Category = mongoose.model('Category', schema)



