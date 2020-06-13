var express=require('express')
var app=express()
var bodyparser=require('body-parser')
var mongoose=require('mongoose')
var Campground=require('./models/campground')
var Comment=require('./models/comment')
var seedDB=require("./seeds")
seedDB();

mongoose.connect("mongodb://localhost:27017/yelpcamp",{ useNewUrlParser: true })

app.use(bodyparser.urlencoded({extended:true}))

app.set("view engine","ejs")




app.get("/",function(req,res){
    res.render("landing")
})

app.get("/campgrounds",function(req,res){
    
    //res.render("campgrounds",{campgrounds:campgrounds})
    Campground.find({},function(err,AllCampgrounds){
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.render("index",{campgrounds:AllCampgrounds})
        }
      })
})

app.post("/campgrounds",function(req,res)
{
    var name=req.body.name
    var image=req.body.image
    var description=req.body.description
    var newCampground={name : name , image : image , description : description}
    //campgrounds.push(newCampground)
    Campground.create(newCampground,function(err,newlyCreated){
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.redirect("/campgrounds")
        }
    })
})

app.get("/campgrounds/new",function(req,res)
{
    res.render("new")
})

app.get("/campgrounds/:id",function(req,res)
{
    Campground.findById(req.params.id).populate("comments").exec(function(err,found)
    {
        if(err)
        {
            console.log(err)
        }
        else{
            console.log(found)
            res.render("show",{campground:found})
        }
    })
})

app.listen(8900,function(req,res){
    console.log("server started")
  })