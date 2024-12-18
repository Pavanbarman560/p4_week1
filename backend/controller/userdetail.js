const usermodel = require("../models/usermodel")

async function userdetailcontroller(req,res) {
    try {

        const user = await usermodel.findById(req.userId)

        res.status(200).json({
            data:user,
            error:false,
            success: true,
            message: "user details"
        })
        
        console.log("user", user)


    } catch (err) {

        res.status(400).json({


            message: err.message,
            error: true,
            success: false

        })

    }


}

module.exports = userdetailcontroller