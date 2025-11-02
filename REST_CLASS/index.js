const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/posts', (req, res) => {
    res.render("index.ejs", { posts });
});

app.post('/register', (req, res) => {
    res.send("POST request received");
});
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use(express.json()); // Middleware to parse JSON bodies

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

let posts=[


    { id:"1",
        username: "swasti",
        content: "you are idiot!okay fine"
    },
    {       id:"2",
        username: "gungun",
        content: "you are duffer!okay fine."
    },

    {    id:"3",
        username: "aayu",
        content: "oyeee!pagal kaise bola,mammiiiiii isne pagal bola😒"
    }
]

app.get('/posts/new', (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    posts.push({ username, content });
    res.redirect('/posts');
});

app.get('/posts/:id', (req, res) => {
    let {id}=req.params;
    let post = posts.find(p => id === p.id);
    res.render("show.ejs", { post });
});