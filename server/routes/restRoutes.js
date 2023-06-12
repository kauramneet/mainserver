const router = require('express').Router()
const helper = require('../utilities/helpers')

const productController = require('../apis/product/productController')
const restController = require('../apis/rest/restController')
const userController = require('../apis/user/userController')





router.post('/user/addrest', userController.addUser)
router.post('/rest/login', userController.login)

router.use(require('../middleware/restTokenChecker'))
router.post('/add', helper.uploadImageFun.single('rest_image'), restController.addRest)
router.post('/all', restController.getAll)
router.post('/single', restController.getSingle)


//** POroduct Menu */
router.post('/pro/add', helper.uploadImageFun.single('product_image'), productController.addProduct)
router.post('/pro/all', productController.getAll)
router.post('/pro/single', productController.getSingle)

router.all('*', (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})

module.exports = router