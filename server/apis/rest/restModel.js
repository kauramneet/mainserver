const mongoose = require('mongoose')
const restSchema = mongoose.Schema({
    restId: { type: Number, default: 0 },
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    detail: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    isApproved:{type:Boolean,default:false},
    isRejected:{type:Boolean,default:false},
    isUsed:{type:Boolean,default:false},
    approvalMsg:{ type: String, default: "" },

    userId:{ type:mongoose.Schema.Types.ObjectId,ref:'user',default:null},
    cityId:{ type:mongoose.Schema.Types.ObjectId,ref:'city',default:null},
    
    approvedBy:{ type:mongoose.Schema.Types.ObjectId,ref:'user',default:null},
    status:{type:Boolean,default:false},
    createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('rest', restSchema)
