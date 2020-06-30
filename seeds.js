var mongoose=require('mongoose')
var Campground=require('./models/campground')
var Comment=require('./models/comments')

data=[
    {name:"Clouds Rest",
    image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
},
{
    name:"Forest favor",
    image:"https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
},
{
    name:"The Boaty Camp",
    image:"https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
}
]

function seedDB()
{
    //REMOVE ALL CAMPGROUNDS
    Campground.remove({},function(err)
    {
        if(err)
        {
            console.log(err)
        }
        console.log("Campground removed")

            //add campgrounds
        data.forEach(function(seed)
        {
            Campground.create(seed,function(err,campground)
            {
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    console.log("added a campground")
                    //add a comment
                    Comment.create({
                        text:"The place is great but I wish there was Internet",
                        author:"Homer"
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
                            console.log("Added comment")
                        }
                    })
                }
            })
        })
    }) 
}

module.exports=seedDB