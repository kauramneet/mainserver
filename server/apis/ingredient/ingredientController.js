const Ingredient = require('./ingredientModel')
const helper = require('../../utilities/helpers')


exports.getAll = async (req, resp) => {
    await Ingredient.find(req.body).then(res => {
        resp.send({ success: true, status: 200, message: "All Ingredients loaded", data: res })
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
    await Ingredient.findOne(query).then(res => {
        if (!!res) {
            resp.send({ success: true, status: 200, message: "Ingredient loaded Successfully", data: res })
        }
        else
            resp.send({ success: false, status: 404, message: "No Ingredient Found" })
    }).catch(err => {
        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
    })

}
exports.addIngredient = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.name)
        validation += "name is required,"
    if (!formData.image)
        validation += "image is required,"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let total = await Ingredient.countDocuments()
        let ingredientData = {
            ingredientId: total + 1,
            name: formData.name,
            image: "ingredient/" + formData.image
        }
        let category = new Ingredient(ingredientData)
        let prevCategory = await Ingredient.findOne({ name: formData.name })
        if (prevCategory)
            resp.send({ success: false, status: 409, message: "Ingredient already exists with same name" })
        else
            category.save().then(res => {
                resp.send({ success: true, status: 200, message: "Ingredient added Successfully", data: res })

            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }


}



exports.updateIngredient = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await Ingredient.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.name)
                    res.name = formData.name
                if (!!formData.image)
                    res.image = "ingredient/" + formData.image
                if (!!formData.status)
                    res.status = formData.status
                let id = res._id
                let prevCategory = await Ingredient.findOne({ $and: [{ name: res.name }, { _id: { $ne: id } }] })
                if (prevCategory)
                    resp.send({ success: false, status: 409, message: "Ingredient already exists with same name" })
                else
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Ingredient updated Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No Ingredient Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }


}

