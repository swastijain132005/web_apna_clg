// init.js
const mongoose = require('mongoose');
const Chat = require('./models/chat');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  console.log("Connected to MongoDB");
}

main().then(async () => {
  let allChats = [
    {
      from: "swasti",
      to: "saurabh",
      msg: "Hey, are you coming to class tomorrow?",
      timestamp: new Date("2025-08-10T10:15:00Z")
    },
    {
      from: "saurabh",
      to: "swasti",
      msg: "Yes, I’ll be there by 9!",
      timestamp: new Date("2025-08-10T10:16:00Z")
    },
    {
      from: "amit",
      to: "swasti",
      msg: "Can you share the project notes?",
      timestamp: new Date("2025-08-12T14:30:00Z")
    },
    {
      from: "swasti",
      to: "amit",
      msg: "Sure, I will send them in the evening.",
      timestamp: new Date("2025-08-12T15:00:00Z")
    },
    {
      from: "neha",
      to: "saurabh",
      msg: "Let’s meet at the library after lunch.",
      timestamp: new Date("2025-08-14T12:45:00Z")
    }
  ];

  await Chat.insertMany(allChats);
  console.log("Chats inserted successfully");
}).catch(err => console.log(err));

mongoose.connection.close();
