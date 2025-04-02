const socketio_wantfriend = require('./socket_handler/socketio_wantfriend')

const userSockets = new Map();


const socketio = (io)=>{
    io.on("connection",(socket)=>{
        console.log(`${socket.id} 유저 접속`)

        socket.on("connection", (data) => {
            const email = data.email;
            userSockets.set(email, socket.id);
            console.log(`📌 ${email} 접속. 현재 연결된 소켓아이디:`, userSockets.get(email));
          });

        socketio_wantfriend(socket, userSockets);
        
    })
}

module.exports = socketio;