var mongoose=require('mongoose')
var Campground=require('./models/campground')
var Comment=require('./models/comment')

var data=[
    {
        name:"The Boaty Camp",
        image:"https://pixabay.com/get/57e9d74a4353b10ff3d8992ccf2934771438dbf85254784870277cdd9f48_340.jpg",
        description:"Awesome place to visit with your loved ones"
    },
    {
        name:"The Reflectain",
        image:"https://pixabay.com/get/54e2dc444852a814f1dc84609620367d1c3ed9e04e507440742a73d39e45c0_340.jpg",
        description:"Awesome place to visit with your loved ones"
    },
    {
        name:"The Farm House",
        image:"https://pixabay.com/get/57e6dd424e5aa914f1dc84609620367d1c3ed9e04e507440742a73d39e45c0_340.jpg",
        description:"Awesome place to visit with your loved ones"
    }
]

function seedDB()
{
    //Remove all campgrounds
Campground.remove({},function(err)
{
    if(err)
    {
        console.log(err)
    }
    console.log("Campground removed")

    data.forEach(function(seed)
    {
        Campground.create(seed,function(err,campground){
            if(err)
            {
                console.log(err)
            }
            else
            {
                console.log("Campground added")


                Comment.create(
                    {
                        text:"This place is great and worth the money",
                        author:"Rishav"
                    },function(err,comment)
                    {
                        if(err)
                        {
                            console.log(err)
                        }
                        else
                        {
                            campground.comments.push(comment)
                            campground.save()
                            console.log("Comment created")

                        }
                    }
                )
            }    
          })
    })


})
    //add a few campgrounds


}
module.exports=seedDB