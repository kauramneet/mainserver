const router = require('express').Router()
const helper = require('../utilities/helpers')


//controllers
const userController = require('../apis/user/userController')

const categoryController = require('../apis/category/categoryController')
const subcategoryController = require('../apis/subcategory/subcategoryController')
const cityController = require('../apis/city/cityController')
const ingredientController = require('../apis/ingredient/ingredientController')
const productController = require('../apis/product/productController')
const orderController = require('../apis/order/orderController')
const dashboardController = require('../apis/dashboard/dashboardController')
const restController = require('../apis/rest/restController')

//auth
router.post('/user/login', userController.login)
router.post('/user/addrest', userController.addUser)

//user
router.post('/user/add', userController.addUser)
router.post('/user/update', userController.updateUser)

//category
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


router.use(require('../middleware/tokenChecker'))

//dashboard
router.get('/dashboard', dashboardController.dashboard)


//customer
router.post('/user/all', userController.getAll)
router.post('/user/single', userController.getSingle)


//category

router.post('/category/add', helper.uploadImageFun.single('category_image'), categoryController.addCategory)
router.post('/category/update', helper.uploadImageFun.single('category_image'), categoryController.updateCategory)

//subcategory

router.post('/subcategory/add', helper.uploadImageFun.single('subcategory_image'), subcategoryController.addSubcategory)
router.post('/subcategory/update', helper.uploadImageFun.single('subcategory_image'), subcategoryController.updateSubcategory)

//ingredient 

router.post('/ingredient/add', helper.uploadImageFun.single('ingredient_image'), ingredientController.addIngredient)
router.post('/ingredient/update', helper.uploadImageFun.single('ingredient_image'), ingredientController.updateIngredient)

//city 

router.post('/city/add', cityController.addcity)
router.post('/city/update', cityController.updatecity)


//product

router.post('/product/add', helper.uploadImageFun.single('product_image'), productController.addProduct)
router.post('/product/update', helper.uploadImageFun.single('product_image'), productController.updateProduct)

//customer
router.post('/order/all', orderController.getAll)
router.post('/order/single', orderController.getSingle)
router.post('/order/add', orderController.addOrder)
router.post('/order/update', orderController.updateOrder)


//Rest Manage
router.post('/rest/add', helper.uploadImageFun.single('rest_image'), restController.addRest)
router.post('/rest/all', restController.getAll)
router.post('/rest/single', restController.getSingle)
router.post('/rest/action', restController.action)

router.all('*', (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})

module.exports = router