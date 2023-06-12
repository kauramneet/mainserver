const City = require('./cityModel')
const helper = require('../../utilities/helpers')


exports.getAll = async (req, resp) => {
    await City.find(req.body).then(res => {
        resp.send({ success: true, status: 200, message: "All citys loaded", data: res })
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
    await City.findOne(query).then(res => {
        if (!!res) {
            resp.send({ success: true, status: 200, message: "city loaded Successfully", data: res })
        }
        else
            resp.send({ success: false, status: 404, message: "No city Found" })
    }).catch(err => {
        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
    })

}



exports.addcity = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.name)
        validation += "name is required,"


    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let total = await City.countDocuments()
        let cityData = {
            cityId: total + 1,
            name: formData.name
        }
        let city = new City(cityData)
        let prevcity = await City.findOne({ name: formData.name })
        if (prevcity)
            resp.send({ success: false, status: 409, message: "city already exists with same name" })
        else
            city.save().then(res => {
                resp.send({ success: true, status: 200, message: "city added Successfully", data: res })

            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }


}



exports.updatecity = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await City.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.name)
                    res.name = formData.name
                if (!!formData.status)
                    res.status = formData.status
                let id = res._id
                let prevcity = await City.findOne({ $and: [{ name: res.name }, { _id: { $ne: id } }] })
                if (prevcity)
                    resp.send({ success: false, status: 409, message: "city already exists with same name" })
                else
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "city updated Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No city Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }


}

