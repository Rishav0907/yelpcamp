var mongoose=require('mongoose')

commentSchema=mongoose.Schema({
    text:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
})

Comment=mongoose.model("Comment",commentSchema)

module.exports=(Comment)