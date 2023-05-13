const httpServer = require('http').createServer();
const { Server } = require('socket.io');
const cors = require('cors');
const io = new Server(httpServer, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
      }
})
httpServer.listen(8000);
var users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        if (name != 'null') {
            users[socket.id] = name;
            socket.broadcast.emit('user-connected', users[socket.id]);
        }
        
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {'message' : message, 'name' : users[socket.id]});
    })

    socket.on('disconnect', message => {
        socket.broadcast.emit('dissconect', users[socket.id]);
        delete users[socket.id];
    })
})