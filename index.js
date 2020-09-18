const server = require('./api/server.js');

const PORT = process.env.PORT || 3300;
server.get('/', (req, res) => {
  res.status(200).json({api : "up"})
})

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
