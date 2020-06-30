var express                 = require('express')
var app                     = express()
var bodyparser              = require('body-parser')
var mongoose                = require('mongoose')
var passport                = require('passport')
var localStratergy          = require('passport-local')
var expressSession          = require('express-session')
var passportLocalMongoose   = require('passport-local-mongoose')
var Campground              = require('./models/campground')
var Comment                 = require('./models/comments')
var User                    = require('./models/user')
var seedDB                  = require('./seeds')
var path                    = require('path')
var campgroundRoutes        = require('./routes/campgrounds'),
    commentRoutes           = require('./routes/comments'),
    indexRoutes             = require('./routes/index')
// seedDB() //seed database
//var Comment = require('./models/comment')
mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true })
app.use('/public',express.static(path.join(__dirname,'public/')))

//PASSPORT CONFIGURATION

app.use(expressSession({
    secret:'I love arpita',
    resave:false,
    saveUninitialized:false
}))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(new localStratergy(User.authenticate()))
app.use(passport.initialize())
app.use(passport.session())


app.set("view engine", "ejs")
app.use(bodyparser.urlencoded({ extended: true }))
app.use((req,res,next)=>
{
    res.locals.currentUser=req.user
    next()
})
app.use(campgroundRoutes)
app.use(commentRoutes)
app.use(indexRoutes)



app.listen(8900, function (req, res) {
    console.log("server started")
})