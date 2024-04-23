// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();

const middlewares = jsonServer.defaults()
const port = process.env.PORT||4000

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
/*
const cors = require('cors');
server.use(cors({
 //  https://average-cape-pig.cyclic.app/
  origin:  ['localhost:4000', 'https://average-cape-pig.cyclic.cloud', '*'], // use your actual domain name (or localhost), using * is not recommended
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
   credentials: true
}))*/
const router = jsonServer.router("db.json");

server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running on port '+port)
})
