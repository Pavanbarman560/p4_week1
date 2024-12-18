async function userlogout(req, res) {

    try {

        res.clearCookie("token")


        res.json({
            message: "logged out successfully",
            error: false,
            success: true,
            data: []

        })

    } catch (err) {

        res.json({
            message: err.message || err,
            error: true,
            success: false

        })

    }


}

module.exports = userlogout