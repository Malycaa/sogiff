const { User, Profile, Post } = require("../models/index")

const bycrpt = require("bcryptjs")
const { changeDate } = require("../help/help")
const { Op } = require("sequelize")


class adminController {
    static login(req, res) {
        res.render("loginAdmin.ejs")
    }

    static loginPost(req, res, next) {
        // console.log(req.body)
        let { username, password } = req.body
        User.findOne({
            where: { username }
        })
            .then(user => {
                if (user && user.role === "admin") {
                    let truePassword = bycrpt.compareSync(password, user.password)
                    if (truePassword) {
                        req.session.userid = user.id
                        return res.redirect(`/admin/alluser`)
                    } else {
                        const error = "Invalid username/password"
                        return res.redirect(`/admin/login?error=${error}`)
                    }
                } else {
                    return res.send(`anda bukan admin`)
                }

            })
            .catch(err => {
                console.log(err)
                // res.send(err)
            })
    }

    static alluser(req, res, next) {
        let name = req.query.name
        // console.log(name)
        Profile.findAll({
            where: {
                name: Profile.search(name)
            },
            include: User
        })
            .then(result => {
                // res.send(result)
                // console.log(result)
                res.render('alluser.ejs', { result, changeDate })
            })
            .catch(err => {
                console.log(err)
            })

    }

    static editProfile(req, res, next) {
        let id = +req.params.profileId

        Profile.findByPk(id, {
            include: User
        })
            .then(result => {
                // console.log(result)
                // res.send(result)
                res.render('editProfile.ejs', { result })
            })
            .catch(err => {
                console.log(err)
            })

    }

    static editProfilePost(req, res, next) {
        let { name, gender, username, email, UserId } = req.body
        let data1 = { name, gender }
        let data2 = { username, email }
        let profileId = +req.params.profileId
        // console.log(req.params)

        Profile.update(data1, {
            where: {
                id: profileId
            },
        })
            .then(result => {
                return User.update(data2, {
                    where: {
                        id: +UserId
                    }
                })
            })
            .then(result => {
                res.redirect('/admin/alluser')
            })
            .catch(err => {
                console.log(err)
            })

    }

    static view(req, res, next) {
        let id = +req.params.UserId
        // console.log(id)
        Post.findAll({
            where: {
                UserId: id
            }
        })
            .then(result => {
                res.render('postAdmin.ejs', { result, changeDate })
            })
    }

    static like(req, res, next) {
        let id = +req.params.postId
        // console.log(id)
        let temp
        Post.findByPk(id)
            .then(result => {
                temp = result
                return Post.increment('like', {
                    where: {
                        id: id
                    }
                })
            })
            .then(result => {

                // console.log(temp)
                res.redirect(`/admin/alluser/view/${temp.UserId}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static unlike(req, res, next) {
        let id = +req.params.postId
        // console.log(id)
        let temp
        Post.findByPk(id)
            .then(result => {
                temp = result
                return Post.increment('unlike', {
                    where: {
                        id: id
                    }
                })
            })
            .then(result => {
                // console.log(temp)
                res.redirect(`/admin/alluser/view/${temp.UserId}`)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = adminController