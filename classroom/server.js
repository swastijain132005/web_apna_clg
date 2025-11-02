const express=require("express");
const app=express();
const port=3000;
const session =require("express-session");
const flash=require("connect-flash");
const Path=require("path");

app.set("view-engine","ejs");
app.set("views",Path.join(__dirname,"views"));
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
app.get("/register",(req,res)=>{
    let{name="anonymous"}=req.query;
    req.session.name=name;
    if(name==="anonymous"){
        req.flash("error","no name provided, using anonymous");
    }
    else{
      req.flash("success",`user registered successfully`); 
    }
    
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.locals.successmsg=req.flash("success");
    res.locals.errormsg=req.flash("error");
    res.render("page.ejs",{name:req.session.name});
})

app.get("/session",(req,res)=>{
    if(req.session.views){
        req.session.views++;
        res.send(`Number of views: ${req.session.views}`);
    }else{
        req.session.views=1;
        res.send("Welcome to the session demo. Refresh!");
    }
});
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});