const mongoose = require('mongoose')
const ingredientSchema = mongoose.Schema({

    ingredientId: { type: Number, default: 0 },
    name: { type: String, default: "" },
    image: { type: String, default: "ingredient/default.jpg" },
    status: { type: Boolean, default: true },

    createdAt: { type: Date, default: Date.now }
})
const ingredient = module.exports = mongoose.model('ingredient', ingredientSchema)
