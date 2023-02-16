const socket = io("https://invtoad.github.io/INVToadServer.github.io/", {
  cors: {
    origin: "*"
  },
  reconnection: false,
});


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});