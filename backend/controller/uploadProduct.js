const uploadProductPermission = require("../helpers/permission")
const productModel = require("../models/productModel")

async function uploadProductControllar(req, res) {

    try {

        if (!uploadProductPermission(req.userId)) {

            throw new Error("permission denied")
        }

        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({

            message: "product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct

        })

    } catch (err) {


        res.status(400).json({
            message: err.message,
            error: true,
            success: false

        })


    }

}
module.exports = uploadProductControllar