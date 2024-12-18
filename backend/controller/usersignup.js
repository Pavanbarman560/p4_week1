const usermodel = require("../models/usermodel")
const bcrypt = require('bcryptjs');


async function usersignupcontroller(req, res) {

    try {

        const { email, password, name } = req.body
        const user = await usermodel.findOne({ email })

        if (user) {
            throw new Error("user Already exist")
        }

        if (!email) {
            throw new Error("please provide email")
        }

        if (!password) {
            throw new Error("please provide password")
        }

        if (!name) {
            throw new Error("please provide name")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashpassword = await bcrypt.hashSync(password, salt);

        if (!hashpassword) {

            throw new Error("something is wrong")
        }

        const payload = {
            ...req.body,
            password: hashpassword,
            role: "GENERAL"
        }

        const userdata = new usermodel(payload)
        const saveuser = await userdata.save()

        res.status(201).json({

            data: saveuser,
            success: true,
            error: false,
            message: "user created successfully"

        })

    } catch (err) {

        res.json({
            message: err.message || err,
            error: true,
            success: false

        })
    }
}

module.exports = usersignupcontroller