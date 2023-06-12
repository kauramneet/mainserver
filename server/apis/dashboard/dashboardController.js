const User = require('../user/userModel')
const Product = require('../product/productModel')
const Category = require('../category/categoryModel')
const City = require('../city/cityModel')
const Order = require('../order/orderModel')
const Rest = require('../rest/restModel')


exports.dashboard = async (req, res) => {
    let totalCustomers = await User.find({ userType: 2 })
    let totalRest = await User.find({ userType: 3 })
    let totalProducts = await Product.countDocuments()
    let totalCategory = await Category.countDocuments()
    let totalCity = await City.countDocuments()
    let totalOrders = await Order.countDocuments()
    let approvedRest = await Rest.countDocuments({isApproved:true})
    let rejectedRest = await Rest.countDocuments({isRejected:true})
    let pendingRest = await Rest.countDocuments({isUsed:false})
    res.send({
        success: true, status: 200, 
        totalOrders: totalOrders,
        totalCustomers: totalCustomers.length,
        totalRest: totalRest.length,
        approvedRest: approvedRest,
        rejectedRest: rejectedRest,
        pendingRest: pendingRest,
        totalCity: totalCity,
        totalCategory: totalCategory,
        totalProducts: totalProducts,
    })
}

