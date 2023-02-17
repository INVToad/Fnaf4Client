const socket = io("https://FnafServer.jarethcochrane.repl.co", {
  reconnection: false,
});


socket.on('connect', function() {
  console.log('user connected')
});
socket.on('disconnect', function() {
  console.log('user disconnected')
});