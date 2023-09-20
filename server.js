// server.js
//const express = require("express");
const jsonServer = require("json-server");
// Import the library:
//const cors = require('cors');

const server = jsonServer.create();
const middlewares = jsonServer.defaults()
//const server = express();
/*
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*', 'http://localhost:4000')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})*/



server.use(cors({
   
    origin: '*', ['localhost:4000', 'https://wild-gray-beaver-robe.cyclic.cloud'],  use your actual domain name (or localhost), using * is not recommended
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))
/*
server.get("/json", (req, res) => {
   res.json({ message: "Hello world" });
});*/
//const router = express.Router("db.json");
const router = jsonServer.router("db.json");

const port = process.env.PORT||4000

const router = jsonServer.router("db.json");


server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running on port '+port)
})
