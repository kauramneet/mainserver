const Rest = require('./restModel')
const helper = require('../../utilities/helpers')


exports.addRest = async (req, resp) => {
    let formData = req.body
    let prevRest = await Rest.findOne({$and:[{ userId: formData.userId },]})
    let prevRest2 = await Rest.findOne({$and:[{ userId: formData.userId },{isRejected:true},{isUsed:true}]})
    console.log('1',prevRest,'2',prevRest2)
    if (prevRest!=null && prevRest2==null){
        resp.send({ success: false, status: 409, message: "User Already have a restautrant not allow to register with same Id" })
    }
    else{
        let total = await Rest.countDocuments()
        let restData = {
            restId: total + 1,
            name: formData.name,
            detail: formData.detail,
            phone: formData.phone,
            address: formData.address,
            cityId: formData.cityId,
            userId: formData.userId,
            image: "rest/" + formData.image
        }
        if(req.decoded!=null && req.decoded.userType!=null && req.decoded.userType==1){
            restData.isApproved = true
            restData.isUsed = true
            restData.approvalMsg = "Direct Added via Admin Panel"
            restData.approvedBy = req.decoded._id
        }
        
        let rest = new Rest(restData)
        rest.save().then(res => {
            resp.send({ success: true, status: 200, message: "Restaurant added Successfully wait for Approval", data: res })

        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
}



exports.getAll = async (req, resp) => {
    await Rest.find(req.body).populate("userId","name email").populate("cityId","name status").then(res => {
        resp.send({ success: true, status: 200, message: "All Rest loaded", data: res })
    }).catch(err => {
        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
    })
}



exports.getSingle = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"

    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })

    let query = { _id: formData._id }
    await Rest.findOne(query).populate("userId","name email").populate("cityId","name status").then(res => {
        if (!!res) {
            resp.send({ success: true, status: 200, message: "Rest loaded Successfully", data: res })
        }
        else
            resp.send({ success: false, status: 404, message: "No Category Found" })
    }).catch(err => {
        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
    })

}

exports.action = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"

    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })

    let query = { _id: formData._id }
    await Rest.findOne(query).then(res => {
        if (!!res) {
            res.isApproved = formData.isApproved            
            res.isRejected = formData.isRejected            
            res.approvalMsg = formData.approvalMsg  
            res.isUsed = true
            res.save();
            resp.send({ success: true, status: 200, message: "Restautrant Status Updated" })        
        }
        else
            resp.send({ success: false, status: 404, message: "No Rest Found" })
    }).catch(err => {
        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
    })

}