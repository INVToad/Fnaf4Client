const socket = io("https://invtoad.github.io/INVToadServer.github.io/", {
  cors: {
    origin: "*"
  },
  reconnection: false,
});


io.on('Connection', (socket) => {
  res.send('user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});