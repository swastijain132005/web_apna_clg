const express=require("express");
const app=express();

const port=8080;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});

app.get('/register',(req,res)=> {
    res.send("GET request received");
});
app.post('/register', (req, res) => {
    res.send("POST request received");
}

)