const router = require("express").Router();
const jwt = require('jsonwebtoken')

router.post("/", async (req, res) => {
    try {
        const username = req.body.email;
        const password = req.body.password;
        if (!username || !password)
            return res.status(400).send({ message: "All fields are required" });
        if (username !="admin@brocart.com" && password != "azs123")
            return res.status(400).send({ message: "Invalid Email or Password" });
        if (username === "admin@brocart.com" && password === "azs123") {
            const Admintoken = jwt.sign({ admin: true }, process.env.JWTADMINKEY);
            res.status(200).send({ data: Admintoken, message: "LogedIn Succesfully" });
        }
    } catch (error) {
        console.log("Error: ", error.message)
        res.status(500).send({ message: "Internal Server Error....." })
    }

});


module.exports = router;