const mongoose=require("mongoose");
const schema =  mongoose.Schema;


main().then(() => {
  console.log("Connected to MongoDB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationship_demo');
}

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  const userSchema = new schema({
  username: String,
  addresses: [
    {
      location: String,
      city: String,
      
    },
  ]
});

const addUser = async (userData) => {
  let user1=newuser({
    username:"sherlock",
    addresses:[
      {
        location:"abcd",
        city:"london"
      }
    ]

  })
let result=  await user1.save();
console.log(result);
};

addUser();

const user = mongoose.model("User", userSchema);

const User = mongoose.model("User", userSchema);
module.exports = User;