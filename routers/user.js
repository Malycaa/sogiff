"use strict"

const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")



router.get("/login", userController.login)
router.post("/login", userController.loginPost)

router.use(function (req, res, next) {
  if (req.session.userid) {
    next()
  } else {
    let errors = `Please login first`
    res.redirect(`/user/login?error=${errors}`)
  }
})

router.get("/post/:id", userController.showPost)

router.get("/unlike/:idPost", userController.unlike)

router.get("/like/:idPost", userController.like)

router.get("/delete/:idPost", userController.delete)

router.get("/add/:userId", userController.addPost)

router.post("/add/:userId", userController.postAddPost)






module.exports = router 