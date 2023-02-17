const socket = io("invtoad.github.io/INVToadServer.github.io/", {
  cors: {
    origin: "*"
  },
  reconnection: false,
});


socket.on('connect', function() {
  console.log('user connected')
});
socket.on('disconnect', function() {
  console.log('user disconnected')
});