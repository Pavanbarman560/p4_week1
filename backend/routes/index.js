const express = require('express')

const router = express.Router()

const usersignupcontroller = require("../controller/usersignup")
const usersignincontroller = require('../controller/usersignin')
const userdetailcontroller = require('../controller/userdetail')
const authtoken = require('../middleware/authtoken')
const userlogout = require('../controller/userlogout')
const allusers = require('../controller/allusers')
const updateUser = require('../controller/updateUser')
const uploadProductControllar = require('../controller/uploadProduct')
const getProductsController = require('../controller/getProducts')
const updateProductControllar = require('../controller/updateProduct')



router.post("/signup", usersignupcontroller)
router.post("/signin", usersignincontroller)
router.get("/user-details", authtoken, userdetailcontroller)
router.get("/userlogout", userlogout)

// admin pannel

router.get("/all-users", authtoken, allusers)
router.post("/update-user", authtoken, updateUser)

//products

router.post("/upload-product", authtoken, uploadProductControllar)
router.get("/get-product",getProductsController)
router.post("/update-product",authtoken,updateProductControllar)

module.exports = router