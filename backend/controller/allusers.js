const usermodel = require("../models/usermodel")

async function allusers(req, res) {

    try {


        console.log("user-id of all users", req.userid)

        const allusers = await usermodel.find()

        res.json({

            message : "all users details ",
            data : allusers,
            success : true,
            error : false
        })

    } catch (err) {

        res.status(400).json({

            message: err.message,
            error: true,
            success: false

        })

    }
}
module.exports = allusers