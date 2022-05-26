const { User, Post, Profile } = require("../models/index")

const bycrpt = require("bcryptjs")

const { changeDate } = require("../help/help")

const nodemailer = require('nodemailer');



class userController {
    static login(req, res) {
        res.render("loginUser.ejs")
    }

    static loginPost(req, res, next) {
        let { username, password } = req.body

        User.findOne({
            where: { username }
        })
            .then(user => {
                let id = user.id
                if (user && user.role === "user") {
                    let truePassword = bycrpt.compareSync(password, user.password)
                    if (truePassword) {
                        // console.log(id)
                        req.session.userid = user.id
                        // console.log(req.session)
                        // localStorage.setItem('id', id)

                        return res.redirect(`/user/post/${id}`)
                        // return res.redirect(`/user/post/${id}?id=`)
                    } else {
                        const error = "Invalid username/password"
                        return res.redirect(`/user/login?error=${error}`)
                    }
                } else {
                    return res.send(`anda bukan user`)
                }

            })
            .catch(err => {
                res.send(err)
            })
    }

    static showPost(req, res, next) {
        // console.log(req.params)
        let id = +req.params.id
        let result;
        Post.findAll({
            where: {
                UserId: id
            }
        })
            .then(post => {
                result = post
                return Profile.findOne({
                    where: {
                        UserId: id
                    }
                })
            })//findall usernya gitu ya, nanti passing ke dalam thne dibawah//
            .then(temp => {
                console.log(temp)
                // console.log(result,'========')
                res.render('postUser.ejs', { temp, result, id, changeDate })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static like(req, res, next) {
        let id = +req.params.idPost
        let email



        // console.log(id)
        let temp
        Post.findByPk(id, {
            include: User
        })
            .then(result => {
                // res.send(result)
                email = result.User.email
                temp = result
                // console.log(result)
                return Post.increment('like', {
                    where: {
                        id: id
                    }
                })
            })
            .then(result => {

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'randychan35@gmail.com',
                        pass: 'ehvdovnblfkpenzy'
                    }
                });

                let mailOptions = {
                    from: 'randychan35@gmail.com',
                    to: email,
                    subject: 'SoGif!',
                    text: `ada yang melike post mu!`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("erorrr cuk!!");
                        console.log(error);
                    } else {
                        console.log("jalan cuk!!");
                        res.redirect(`/user/post/${temp.UserId}`)

                    }
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    static unlike(req, res, next) {
        let id = +req.params.idPost
        let email
        // console.log(id)
        let temp
        Post.findByPk(id, {
            include: User
        })
            .then(result => {
                email = result.User.email
                temp = result
                // console.log(result)
                return Post.increment('unlike', {
                    where: {
                        id: id
                    }
                })
            })
            .then(result => {

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'randychan35@gmail.com',
                        pass: 'ehvdovnblfkpenzy'
                    }
                });

                let mailOptions = {
                    from: 'randychan35@gmail.com',
                    to: email,
                    subject: 'SoGif!',
                    text: `ada yang unlike post mu!`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("erorrr cuk!!");
                        console.log(error);
                    } else {
                        console.log("jalan cuk!!");
                        res.redirect(`/user/post/${temp.UserId}`)

                    }
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    static delete(req, res, next) {
        let id = +req.params.idPost
        let temp
        Post.findByPk(id)
            .then(result => {
                temp = result
                // console.log(result)
                return Post.destroy({
                    where: {
                        id: id
                    }
                })
            })
            .then(result => {
                res.redirect(`/user/post/${temp.UserId}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static addPost(req, res, next) {
        let id = req.params.userId
        const { errors } = req.query
        res.render('formAddPost.ejs', { id, errors })
    }

    static postAddPost(req, res) {
        let UserId = req.params.userId
        let { imageURL, caption } = req.body
        let like = 0
        let unlike = 0

        Post.create({ imageURL, like, unlike, UserId, caption })
            .then(result => {
                res.redirect(`/user/post/${UserId}`)
            })
            .catch(err => {
                const errors = err.errors.map(el => {
                    return el.message
                })
                res.redirect(`${UserId}?errors=${errors}`)
                // res.send(err)
                // const errors = {}
                // err.errors.forEach(x => {
                //     if (errors[x.path]) {
                //         errors[x.path] = (x.message)
                //     } else {
                //         errors[x.path] = x.message
                //     }
                // })
                // res.render('formAddPost.ejs', { errors })

            })

    }


}

module.exports = userController