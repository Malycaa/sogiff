"use strict"

const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")



router.get("/login", adminController.login)
router.post("/login", adminController.loginPost)


router.use(function (req, res, next) {
  if (req.session.userid) {
    next()
  } else {
    let errors = `Please login first`
    res.redirect(`/admin/login?error=${errors}`)
  }
})


router.get("/alluser", adminController.alluser)

router.get("/alluser/edit/:profileId", adminController.editProfile)

router.post("/alluser/edit/:profileId", adminController.editProfilePost)

router.get("/alluser/view/:UserId", adminController.view)

router.get("/alluser/view/like/:postId", adminController.like)

router.get("/alluser/view/unlike/:postId", adminController.unlike)







module.exports = router 