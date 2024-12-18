const usermodel = require("../models/usermodel")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
async function usersignincontroller(req, res) {

    try {

        const { email, password } = req.body


        if (!email) {
            throw new Error("please provide email")
        }

        if (!password) {
            throw new Error("please provide password")
        }

        const user = await usermodel.findOne({ email })

        if (!user) {
            throw new Error("user not found")
        }

        const checkpassword = await bcrypt.compare(password, user.password)

        console.log("checkpassword:", checkpassword)

        if (checkpassword) {

            const tokendata = {
                _id: user._id,
                email: user.email,
            }

            const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenopction = {

                httpOnly: true,
                secure: true
            }

            res.cookie("token", token, tokenopction).json({
                message: "login successfully",
                data: token,
                success: true,
                error: false
            })

        }

        else {

            throw new Error("please check password")
        }

    } catch (err) {

        res.json({
            message: err.message || err,
            error: true,
            success: false

        })
    }

}

module.exports = usersignincontroller