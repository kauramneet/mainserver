const mongoose = require('mongoose')
const citySchema = mongoose.Schema({

    cityId: { type: Number, default: 0 },
    name: { type: String, default: "" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
})
const city = module.exports = mongoose.model('city', citySchema)
