// index.js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // For PUT and DELETE requests


// Connect to DB
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
  console.log("Connected to MongoDB");
}
main().catch(err => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

//index route

app.get("/Chats", async (req, res) => {
  let chats = await Chat.find();
  
  res.render("index.ejs",{chats})  // better than just "working"
});
app.get("/Chats/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/Chats",(req,res)=>{
  let{from,to,msg}=req.body;
  let newChat=new Chat ({
    from:from,
    to:to,
    msg:msg,
    timestamp: new Date() // Automatically set the current date and time
  }

  )
  newChat.save()
    .then(() => {
      res.redirect("/Chats");
    })
    .catch((err )=> {
      console.log(err);
      res.status(500).send("Error saving chat");
    })
})

app.get("/Chats/:id/edit",async(req,res)=>{
  let chat = await Chat.findById(req.params.id);
  res.render("edit.ejs",{chat});
})

app.put("/Chats/:id", async (req, res) => {
  let {id}=req.params;
  let{msg:newmsg}=req.body;
  let updatedchat=await Chat.findByIdAndUpdate(id,{msg:newmsg} , {runValidators:true,new:true});

  res.redirect("/Chats");
})

app.delete("/Chats/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Chat.findByIdAndDelete(id);  // deletes the chat with given _id
    res.redirect("/Chats");            // after deleting, redirect back to all chats
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting chat");
  }
});


// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
