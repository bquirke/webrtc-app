const express = require("express")
const http = require("http")

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

//making file accessible outside of server
app.use(express.static("public"));

// Serving the homepage
app.get('/', (req, res) =>{
    res.sendFile(__dirname + "public/index.html");
});


app.get('/hello', (req, res) => {
    res.send("Hello");
});

app.get('/hellow', (req, res) => {
    res.send("Hellow");
});

// Startup
server.listen(PORT, () =>{
    console.log(`Listening on ${PORT}`);
});
