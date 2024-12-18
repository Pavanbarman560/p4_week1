const productModel = require("../models/productModel")

const getProductsController = async (req, res) => {

    try {

        const allProduct = await productModel.find().sort({

            createdAt: -1

        })

        res.json({
            message: "All Products ",
            success: true,
            error: false,
            data: allProduct

        })

    } catch (err) {


        res.status(400).json({
            message: err.message,
            error: true,
            success: false

        })


    }


}

module.exports = getProductsController