"use strict"
const express = require("express")
const router = express.Router()
const adminRoute = require("./admin")
const userRoute = require("./user")



const controller = require("../controllers/controller")
const adminController = require("../controllers/adminController")


router.get("/", controller.home)

router.get("/register", controller.register)
router.post("/register", controller.registerPost)

// router.get("/alluser", adminController.alluser)




router.use("/admin", adminRoute)
router.use("/user", userRoute)

module.exports = router 