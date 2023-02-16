const socket = io("https://invtoadserver.github.io/", {
  reconnection: false,
});


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});