var express     = require('express')
var router      = express.Router()
var passport    = require('passport')
var User        = require('../models/user')

router.get("/", function (req, res) {
    res.render("landing")
})

//AUTH ROUTES
router.get("/register",(req,res)=>
{
    res.render("register")
})
router.post('/register',(req,res)=>
{
    var username=req.body.username
    var password=req.body.password
    User.register(new User({username:username}),password,(err,user)=>
    {
        if(err)
        {
            console.log(err)
            res.redirect("/register")
        }
        else
        {
            passport.authenticate("local")(req,res,()=>
            {
                res.redirect("/campgrounds")
            })
        }
    })
})

//SHOW LOGIN FORM
router.get("/login",(req,res)=>
{
    res.render("login")
})
router.post("/login",passport.authenticate("local",{
            successRedirect: "/campgrounds",
            failureRedirect: "/login"
}),(req,res)=>
{
    res.send('Login post form')
})

//LOGOUT
router.get("/logout",(req,res)=>
{
    req.logOut()
    res.redirect("/campgrounds")
})

function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next()
    }
    res.redirect("/login")
}
module.exports=router