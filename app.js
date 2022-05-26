"use strict"
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express")
const app = express()
const session = require('express-session')
const port = process.env.PORT||3000
const router = require("./routers/index.js")

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true
   }
}))

app.use('/', router)

app.listen(port, () => {
  console.log(`This program is running`, port);
}) 