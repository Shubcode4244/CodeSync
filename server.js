const express = require('express')
const {Server} = require('socket.io')
const app = express();
const http = require('http');
const ACTIONS = require('./src/Actions');
const server = http.createServer(app);

const io = new Server(server);


const userSocketMap={};
// On restart it will gone , so use another method to store permanent

function getAllConnectedClients(roomID){
    // MAP
    return Array.from(io.sockets.adapter.rooms.get(roomID) || []).map((socketId)=>{
        return {
            socketId,
            username:userSocketMap[socketId]
        }
    });
}

io.on('connection',(socket)=>{
    console.log('socket connected',socket.id);
    socket.on(ACTIONS.JOIN,({roomID,username})=>{
        userSocketMap[socket.id]=username;
        socket.join(roomID);
        // On joining one , Other should notify that new one is joining , so get the all existing client
        const clients = getAllConnectedClients(roomID);
        // console.log(clients);
        clients.forEach(({socketId})=>{
            // io.to(socketId).emit(ACTIONS.JOINED)
            io.to(socketId).emit(ACTIONS.JOINED,{
                clients,
                username,
                socketId:socket.id,
            })
        })
    })
// for code sharing 
    socket.on(ACTIONS.CODE_CHANGE,({roomID,code})=>{
        io.to(roomID).emit(ACTIONS.CODE_CHANGE,{code});
    })

    socket.on('disconnecting',()=>{
        const rooms = [...socket.rooms];
        rooms.forEach((roomID)=>{
            socket.in(roomID).emit(ACTIONS.DISCONNECTED,{
                socketId:socket.id,
                username:userSocketMap[socket.id],
            })
        })
        delete userSocketMap[socket.id];
        socket.leave();
    })
    
})





const PORT = process.env.PORT || 4000;

server.listen(PORT,()=>{
    console.log(`Server Connected & Listening on port  ${PORT}`)
})