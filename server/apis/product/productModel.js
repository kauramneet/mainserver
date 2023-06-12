const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    productId: { type: Number, default: 0 },
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'subcategory' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'category' },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },
    restId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'rest' },
    price: { type: Number, default: 0 },
    detail: { type: String, default: "" },
    name: { type: String, default: "" },
    image: { type: String, default: "category/default.jpg" },
    status: { type: Boolean, default: true },
    ingredients:{type:Array,defualt:""},
    discount:{type:String,defualt:""},
    createdAt: { type: Date, default: Date.now }

})


const product = module.exports = mongoose.model('product', productSchema)
