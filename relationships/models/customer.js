const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationship_demo");
}

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

/*customerSchema.pre("findOneAndDelete", async () =>{
console.log("pre middleware");
})*/
//step1
customerSchema.post("findOneAndDelete", async (customer) =>{
if(customer.orders.length){
let res=  Order.deleteMany({_id:{$in:customer.orders}}).then(()=>{
console.log("deleted all orders of the customer");
  })
}
})


const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);




//populate is used to actually print the order object instead of just id

const find = async () => {
  let res = await Customer.findOne({ name: "Swasti" }).populate("orders");
  console.log("Found customer:", res);
};

//functions

const addCust=async()=>{
let newCust=new Customer({
  name:"karan arjun",
});
let newOrder=new Order({
  item:"laptop",
  price:3900202
})
newCust.orders.push(newOrder);
await newCust.save();
await newOrder.save();

console.log("added customer");


}




//step2
const delCust=async()=>{
  let cust=await Customer.findOneAndDelete({name:"karan arjun"});
  console.log(cust);
}

delCust();

//normally agar delete karenge using findbyid and delete to related info delete nahi hongi
//step1 and step2 for related info in tables ko delete karne ke liye

