require('dotenv').config();

const dns = require('dns');
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
const DNS_SERVERS = process.env.DNS_SERVERS;

if (DNS_SERVERS) {
  dns.setServers(DNS_SERVERS.split(',').map((server) => server.trim()).filter(Boolean));
}

connectDB()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Server running at http://${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  });

