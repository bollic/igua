// server.js
const jsonServer = require("json-server");
// Import the library:
const cors = require('cors');

const server = jsonServer.create();

server.use(cors({
   
    origin:  ['localhost:4000', 'https://wild-gray-beaver-robe.cyclic.cloud'], // use your actual domain name (or localhost), using * is not recommended
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults()
const port = process.env.PORT||4000




server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running on port '+port)
})
