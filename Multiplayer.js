const socket = io("https://invtoad.github.io/INVToadServer.github.io/", {
  cors: {
    origin: "*"
  },
  reconnection: false,
});


socket.on('connected', function() {
  console.log('user connected')
});
socket.on('disconnected', function() {
  console.log('user disconnected')
});