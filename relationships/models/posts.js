const mongoose=require("mongoose");
const schema =  mongoose.Schema;


main().then(() => {
  console.log("Connected to MongoDB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationship_demo');
}

const userSchema = new schema({
  name: String,
  email: String,
  
});

const User = mongoose.model("User", userSchema);

const postSchema=new schema({
    content:String,
    likes:Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const Post = mongoose.model("Post", postSchema);

const addData=async()=>{
    let user1=new User({
        username:"gungun jain",
        email:"gungun@123.com"
    })

    let post1=new Post({
        content:"hello world",
        likes:7

    })
    post1.user=user1._id;


   await user1.save();
   await post1.save();
}

addData();

const getData=async()=>{
    let result=await Post.findOne({}).populate("user");
    console.log(result);
}

getData();


