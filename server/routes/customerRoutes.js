const router = require('express').Router()
const helper = require('../utilities/helpers')

const userController = require('../apis/user/userController')
const categoryController = require('../apis/category/categoryController')
const ingredientController = require('../apis/ingredient/ingredientController')
const cityController = require('../apis/city/cityController')
const productController = require('../apis/product/productController')
const subcategoryController = require('../apis/subcategory/subcategoryController')

const restController = require('../apis/rest/restController')




router.post('/user/addcus', userController.addUser)
router.post('/user/login', userController.login)

router.post('/category/all', categoryController.getAll)
router.post('/category/single', categoryController.getSingle)

//ingredient
router.post('/ingredient/all', ingredientController.getAll)
router.post('/ingredient/single', ingredientController.getSingle)


//city
router.post('/city/all', cityController.getAll)
router.post('/city/single', cityController.getSingle)


//subcategory
router.post('/subcategory/all', subcategoryController.getAll)
router.post('/subcategory/single', subcategoryController.getSingle)

//product
router.post('/product/all', productController.getAll)
router.post('/product/single', productController.getSingle)

router.post('/rest/all', restController.getAll)
router.post('/rest/single', restController.getSingle)


router.use(require('../middleware/restTokenChecker'))
// router.post('/category/add', helper.uploadImageFun.single('category_image'), categoryController.addCategory)


router.all('*', (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})

module.exports = router