const server = require('./server');
const {
  server: { port },
} = require('./src/config');

const start = async () => {
  await server.listen(port);
  console.log(`Server listening on port ${port}!`);
};

start().catch(err => {
  console.error('Unable to run the server because of the following error:');
  console.error(err);
  process.exit();
});
