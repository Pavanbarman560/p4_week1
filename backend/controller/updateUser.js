const usermodel = require("../models/usermodel")


async function updateUser(req, res) {

    try {

        const sessionUser = req.userId

        const { userid, email, name, role } = req.body

        const payload = {

            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role }),

        }

        const user = await usermodel.findById(sessionUser)

        console.log("user role is ", user.role)

        const updateUser = await usermodel.findByIdAndUpdate(userid, payload)

        res.json({

            data: updateUser,
            message: "user updated successfully",
            success: true,
            error: false,

        })

    } catch (err) {

        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false

        })

    }

}

module.exports = updateUser