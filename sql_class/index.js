/*const { faker } = require('@faker-js/faker');
const express=require('express');
const app=express();

const mysql=require('mysql2');
const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'swastijain132005',
    database: 'delta'
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL");
});

/*try{
    connection.query('show tables', (error, results) => {
        if (error) throw error;
        console.log(results);
    });
} catch (error) {
    console.error('Error occurred:', error);
}
connection.end();

let getRandomUser=()=> {
  return {
    Id: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    
    password: faker.internet.password()
  };
}

console.log(getRandomUser());

app.get("/", (req, res) => {
let q=`SELECT count(*)FROM user`
try{
    connection.query(q, (error, results) => {
        if (error) throw error;
        console.log(results);
         res.send(`Total users in database: ${results[0].count}`); // 
    });
} catch (error) {
    console.error('Error occurred:', error);
}
});

app.listen("8080",()=>{
  console.log("Server is running on port 8080");

  
})*/

const { faker } = require('@faker-js/faker');
const express = require('express');
const mysql = require('mysql2');


const Path = require("path");
const app = express();

app.set("view engine","ejs");
app.set("views",Path.join(__dirname,"views"));

// ✅ Make sure connection is declared in the global scope
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'swastijain132005',
    database: 'college'
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL");
});

app.get("/", (req, res) => {
    let q = `SELECT COUNT(*) AS count FROM users`;

    // ✅ Use the global 'connection' variable
    connection.query(q, (error, results) => {
        if (error) {
            console.error('Error occurred:', error);
            return res.status(500).send("Database error");
        }
        let count = results[0].count;

 console.log("User count result:", results);
        res.render("home.ejs", {count });
    });
});

app.get("/users", (req, res) => {
    let q = `SELECT * FROM users`;

    connection.query(q, (error, results) => {
        if (error) {
            console.error('Error occurred:', error);
            return res.status(500).send("Database error");
        }
        res.render("users.ejs", { users: results });
    });
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
