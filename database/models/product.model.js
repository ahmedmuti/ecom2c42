import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    title: {
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
    description: {
        type: String,
        minLength: 10,
        maxLength: 1000,
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    priceAfterDiscount: {
        type: Number,
        min: 0,
        required: true,
    },
    imageCover: String,
    images: [String],
    rateAvg: {
        type: Number,
        min: 0,
        max: 5
    },
    rateCount: Number,
    category: {
        type: Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        type: Types.ObjectId,
        ref: 'SubCategory'
    },
    brand: {
        type: Types.ObjectId,
        ref: 'Brand'
    },
    sold: Number,
    stock: {
        type: Number,
        min: 0
    }
}, { timestamps: true, versionKey: false, toJSON: { virtuals: true }, id: false })

schema.virtual('myReviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product'
});

schema.pre("findOne", function () {
    this.populate('myReviews')
})


schema.post('init', function (doc) {
    if (doc.imageCover) doc.imageCover = process.env.BASE_URL + "products/" + doc.imageCover
    if (doc.images) doc.images = doc.images.map(img => process.env.BASE_URL + "products/" + img)
})
export const Product = mongoose.model('Product', schema)



