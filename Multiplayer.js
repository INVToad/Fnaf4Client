const socket = io("https://invtoad.github.io/INVToadServer.github.io/", {
  cors: {
    origin: "*"
  },
  reconnection: false,
});


socket.on('Connection', function() {
  consoel.log('user connected')
});