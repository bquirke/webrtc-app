const express = require("express")
const http = require("http")

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);


//making file accessible outside of server
app.use(express.static("public"));

// Serving the homepage
app.get('/', (req, res) =>{
    res.sendFile(__dirname + "public/index.html");
});


// list of clients connected
let connectedPeers = [];

io.on('connection', (socket) => {
    console.log(connectedPeers);

    connectedPeers.push(socket.id);


    socket.on("disconnect", ()=>{
        console.log("user disconnected");

        const newConnectedPers = connectedPeers.filter((peerSocketId)=>{
            return peerSocketId != socket.id
        });

        connectedPeers = newConnectedPers;
        console.log(connectedPeers);
    });
});


// Startup
server.listen(PORT, () =>{
    console.log(`Listening on ${PORT}`);
});
